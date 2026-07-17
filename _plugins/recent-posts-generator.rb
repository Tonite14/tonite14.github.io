# frozen_string_literal: true
#
# Jekyll Generator: recent posts sorted by last_modified_at.
# Injects content into _tabs/recent.md (page 1) and generates pages 2+.
# No custom layout or include files needed.
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

      # Page 1: inject into _tabs/recent.md
      tab_page = site.pages.find { |p| p.name == 'recent.md' }
      if tab_page
        page1_posts = recent[0, per_page].map { |e| e[:post] }
        paginator = build_paginator(1, total_pages, '/recent/', total_pages > 1 ? '/recent/page2/' : nil)
        tab_page.content = build_html(page1_posts, paginator, site)
      end

      # Pages 2+
      (2..total_pages).each do |page_num|
        slice = recent[(page_num - 1) * per_page, per_page]
        posts = slice.map { |e| e[:post] }
        prev_path = page_num == 2 ? '/recent/' : "/recent/page#{page_num - 1}/"
        next_path = page_num < total_pages ? "/recent/page#{page_num + 1}/" : nil

        paginator = build_paginator(page_num, total_pages, prev_path, next_path)
        dir = "recent/page#{page_num}"

        pg = Page.new(site, site.source, dir, 'index.html')
        pg.data['title'] = "最近 — 第 #{page_num} 页"
        pg.data['layout'] = 'page'
        pg.content = build_html(posts, paginator, site)
        site.pages << pg
      end

      Jekyll.logger.info "RecentPosts:", "#{recent.length} posts → #{total_pages} page(s)"
    end

    private

    def build_paginator(page, total, prev_path, next_path)
      {
        'page' => page, 'total_pages' => total,
        'previous_page_path' => prev_path, 'next_page_path' => next_path
      }
    end

    def build_html(posts, paginator, site)
      html = %(<div id="post-list" class="post-list">\n)
      posts.each do |post|
        url   = "#{site.baseurl}#{post.url}"
        title = post.data['title'].to_s
        cats  = Array(post.data['categories']).join(', ')
        date  = post.date.strftime('%Y-%m-%d')
        summary = (post.data['description'] || post.content.to_s).gsub(/^---.*?---/m, '').strip
        summary = summary[0, 240].gsub("\n", ' ').strip + (summary.length > 240 ? '…' : '')

        html << %(\n<div class="post-preview">)
        html << %(\n  <h1><a href="#{url}">#{escape_html(title)}</a></h1>)
        html << %(\n  <div class="post-content"><p>#{escape_html(summary)}</p></div>)
        html << %(\n  <div class="post-meta text-muted d-flex">)
        html << %(\n    <div class="mr-auto">)
        html << %(\n      <i class="far fa-calendar fa-fw"></i> #{date})
        html << %(\n      <i class="far fa-folder-open fa-fw"></i> #{escape_html(cats)})
        html << %(\n    </div>)
        html << %(\n  </div>)
        html << %(\n</div>\n)
      end
      html << %(\n</div>\n)

      # Paginator
      if paginator['total_pages'] > 1
        html << paginator_html(paginator)
      end

      html
    end

    def paginator_html(paginator)
      h = %(<ul class="pagination align-items-center mt-4 mb-0 pl-lg-2">\n)
      # prev
      if paginator['previous_page_path']
        h << %(  <li class="page-item"><a class="page-link btn-box-shadow" href="#{paginator['previous_page_path']}">&laquo;</a></li>\n)
      else
        h << %(  <li class="page-item disabled"><span class="page-link btn-box-shadow">&laquo;</span></li>\n)
      end
      # page numbers
      (1..paginator['total_pages']).each do |i|
        if i == paginator['page']
          h << %(  <li class="page-item active"><span class="page-link btn-box-shadow">#{i}</span></li>\n)
        else
          href = i == 1 ? '/recent/' : "/recent/page#{i}/"
          h << %(  <li class="page-item"><a class="page-link btn-box-shadow" href="#{href}">#{i}</a></li>\n)
        end
      end
      # next
      if paginator['next_page_path']
        h << %(  <li class="page-item"><a class="page-link btn-box-shadow" href="#{paginator['next_page_path']}">&raquo;</a></li>\n)
      else
        h << %(  <li class="page-item disabled"><span class="page-link btn-box-shadow">&raquo;</span></li>\n)
      end
      h << %(</ul>\n)
      h
    end

    def escape_html(str)
      str.to_s.gsub('&', '&amp;').gsub('<', '&lt;').gsub('>', '&gt;').gsub('"', '&quot;')
    end
  end
end
