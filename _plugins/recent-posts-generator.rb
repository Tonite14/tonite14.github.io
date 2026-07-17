# frozen_string_literal: true
#
# Jekyll Generator: injects sorted recent posts into _tabs/recent.md (page 1)
# and generates pages 2+. Uses layout: page (theme default), pure HTML content.
#

module Jekyll
  class RecentPostsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      now = Time.now
      one_week_ago = now - (7 * 24 * 60 * 60)
      per_page = site.config['paginate'] || 10

      posts_with_lastmod = site.posts.docs.map do |post|
        lm = post.data['last_modified_at']
        lastmod = begin
                    if lm && !lm.to_s.strip.empty?
                      Time.parse(lm.to_s.strip)
                    else
                      post.date
                    end
                  rescue ArgumentError, TypeError
                    post.date
                  end
        { post: post, lastmod: lastmod }
      end

      sorted = posts_with_lastmod.sort_by { |e| e[:lastmod] }.reverse

      recent = sorted.select { |e| e[:lastmod] >= one_week_ago }
      if recent.length < per_page
        already_ids = recent.map { |e| e[:post].id }
        recent.concat(sorted.reject { |e| already_ids.include?(e[:post].id) }.first(per_page - recent.length))
      end

      total_pages = (recent.length.to_f / per_page).ceil

      # --- find the tab page (tabs collection or standalone) ---
      tab_page = find_tab_page(site, 'recent.md')
      if tab_page.nil?
         Jekyll.logger.warn "RecentPosts:", "Could not find _tabs/recent.md"
         return
      end

      # Page 1: inject HTML content into the tab page
      page1_posts = recent[0, per_page].map { |e| e[:post] }
      paginator1 = build_paginator(1, total_pages,
        total_pages > 1 ? '/recent/page2/' : nil)
      tab_page.content = build_html(page1_posts, paginator1, site)

      # Pages 2+
      (2..total_pages).each do |page_num|
        slice = recent[(page_num - 1) * per_page, per_page]
        posts = slice.map { |e| e[:post] }

        prev_path = page_num == 2 ? '/recent/' : "/recent/page#{page_num - 1}/"
        next_path = page_num < total_pages ? "/recent/page#{page_num + 1}/" : nil
        paginator = build_paginator(page_num, total_pages, prev_path, next_path)

        pg = Page.new(site, site.source, "recent/page#{page_num}", 'index.html')
        pg.data['title']     = "最近 — 第 #{page_num} 页"
        pg.data['layout']    = 'page'
        pg.data['permalink'] = "/recent/page#{page_num}/"
        pg.content = build_html(posts, paginator, site)
        site.pages << pg
      end

      Jekyll.logger.info "RecentPosts:", "#{recent.length} posts → #{total_pages} page(s)"
    end

    private

    def find_tab_page(site, filename)
      # tabs collection (Chirpy stores tabs here)
      if (docs = site.collections['tabs']&.docs)
        found = docs.find { |d| d.path&.end_with?(filename) }
        return found if found
      end
      # site.pages fallback
      site.pages.find { |p| p.path&.end_with?(filename) }
    end

    def build_paginator(page, total, next_path)
      {
        'page'             => page,
        'total_pages'      => total,
        'previous_page_path' => page == 2 ? '/recent/' : (page > 2 ? "/recent/page#{page - 1}/" : nil),
        'next_page_path'   => next_path
      }
    end

    def build_html(posts, paginator, site)
      html = +%(<div id="post-list">\n)
      posts.each do |post|
        url     = "#{site.baseurl}#{post.url}"
        title   = escape_html(post.data['title'].to_s)
        cats    = escape_html(Array(post.data['categories']).join(', '))
        date    = post.date.strftime('%Y-%m-%d')
        summary = (post.data.dig('description') || '').strip
        if summary.empty?
          # Strip frontmatter then take first 240 chars
          raw = post.content.to_s.sub(/\A---.*?---/m, '').strip
          summary = escape_html(raw[0, 240].gsub("\n", ' ').strip)
          summary += '…' if raw.length > 240
        else
          summary = escape_html(summary)
        end

        html << %(\n<div class="post-preview" data-url="#{url}">)
        html << %(\n  <h1>#{title}</h1>)
        html << %(\n  <div class="post-content"><p>#{summary}</p></div>)
        html << %(\n  <div class="post-meta text-muted d-flex">)
        html << %(\n    <div class="mr-auto">)
        html << %(\n      <i class="far fa-calendar fa-fw"></i> #{date})
        unless cats.empty?
          html << %(\n      <i class="far fa-folder-open fa-fw"></i> #{cats})
        end
        html << %(\n    </div>)
        html << %(\n  </div>)
        html << %(\n</div>\n)
      end
      html << %(\n</div>\n)

      if paginator['total_pages'] > 1
        html << paginator_html(paginator)
      end

      # Full-card click script
      html << %(
<script>
(function() {
  var cards = document.querySelectorAll('#post-list .post-preview');
  for (var i = 0; i < cards.length; i++) {
    cards[i].style.cursor = 'pointer';
    cards[i].addEventListener('click', function() {
      var url = this.getAttribute('data-url');
      if (url) window.location.href = url;
    });
  }
})();
</script>
)

      html
    end

    def paginator_html(p)
      h = +%(<ul class="pagination align-items-center mt-4 mb-0 pl-lg-2">\n)
      # prev arrow
      if p['previous_page_path']
        h << %(  <li class="page-item"><a class="page-link btn-box-shadow" href="#{p['previous_page_path']}" aria-label="previous-page"><i class="fas fa-angle-left"></i></a></li>\n)
      else
        h << %(  <li class="page-item disabled"><span class="page-link btn-box-shadow"><i class="fas fa-angle-left"></i></span></li>\n)
      end

      (1..p['total_pages']).each do |i|
        if i == p['page']
          h << %(  <li class="page-item active"><span class="page-link btn-box-shadow">#{i}</span></li>\n)
        else
          href = i == 1 ? '/recent/' : "/recent/page#{i}/"
          h << %(  <li class="page-item"><a class="page-link btn-box-shadow" href="#{href}">#{i}</a></li>\n)
        end
      end

      # mobile counter
      h << %(  <li class="page-index align-middle"><span>#{p['page']}</span><span class="text-muted"> / #{p['total_pages']}</span></li>\n)

      # next arrow
      if p['next_page_path']
        h << %(  <li class="page-item"><a class="page-link btn-box-shadow" href="#{p['next_page_path']}" aria-label="next-page"><i class="fas fa-angle-right"></i></a></li>\n)
      else
        h << %(  <li class="page-item disabled"><span class="page-link btn-box-shadow"><i class="fas fa-angle-right"></i></span></li>\n)
      end

      h << %(</ul>\n)
      h
    end

    def escape_html(str)
      str.to_s.gsub('&', '&amp;').gsub('<', '&lt;').gsub('>', '&gt;').gsub('"', '&quot;')
    end
  end
end
