# frozen_string_literal: true
#
# Jekyll Generator: creates paginated pages for recently updated posts.
# Sorted by last_modified_at (via git, set by posts-lastmod-hook.rb), falls back to post.date.
# Shows all posts modified in the last 7 days; fills to 10 if fewer.
#
# Generates: /recent/index.html, /recent/page2/index.html, ...

module Jekyll
  class RecentPostsGenerator < Generator
    safe true
    priority :low  # Run after hooks and collections have set last_modified_at

    def generate(site)
      now = Time.now
      one_week_ago = now - (7 * 24 * 60 * 60)
      per_page = site.config['paginate'] || 10

      # Build effective lastmod for every post
      posts_with_lastmod = site.posts.docs.map do |post|
        lastmod_str = post.data['last_modified_at']
        effective = parse_lastmod(lastmod_str, post.date)
        { post: post, lastmod: effective }
      end

      # Sort by lastmod descending
      sorted = posts_with_lastmod.sort_by { |e| e[:lastmod] }.reverse

      # Step 1: all posts modified in the last week
      recent = sorted.select { |e| e[:lastmod] >= one_week_ago }

      # Step 2: fill to per_page if needed (most recently modified overall, excluding already included)
      if recent.length < per_page
        already_ids = recent.map { |e| e[:post].id }
        supplement = sorted.reject { |e| already_ids.include?(e[:post].id) }
                           .first(per_page - recent.length)
        recent.concat(supplement)
      end

      # Step 3: paginate
      total_pages = (recent.length.to_f / per_page).ceil

      (1..total_pages).each do |page_num|
        start_idx = (page_num - 1) * per_page
        slice = recent[start_idx, per_page]
        posts = slice.map { |e| e[:post] }

        prev_path = if page_num == 2
                      '/recent/'
                    elsif page_num > 2
                      "/recent/page#{page_num - 1}/"
                    end

        next_path = page_num < total_pages ? "/recent/page#{page_num + 1}/" : nil

        paginator = {
          'page' => page_num,
          'total_pages' => total_pages,
          'per_page' => per_page,
          'posts' => posts,
          'previous_page' => page_num > 1 ? page_num - 1 : nil,
          'next_page' => page_num < total_pages ? page_num + 1 : nil,
          'previous_page_path' => prev_path,
          'next_page_path' => next_path
        }

        dir = page_num == 1 ? 'recent' : "recent/page#{page_num}"
        site.pages << RecentPage.new(site, site.source, dir, page_num, posts, paginator, total_pages)
      end

      Jekyll.logger.info "RecentPostsGenerator:", "Generated #{total_pages} page(s) with #{recent.length} posts"
    end

    private

    def parse_lastmod(lastmod_str, fallback_date)
      return fallback_date if lastmod_str.nil? || lastmod_str.to_s.strip.empty?

      Time.parse(lastmod_str.to_s.strip)
    rescue ArgumentError, TypeError
      fallback_date
    end
  end

  class RecentPage < Page
    def initialize(site, base, dir, page_num, posts, paginator, total_pages)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)

      # Load the recent layout
      layout_file = File.join(base, '_layouts', 'recent.html')
      if File.exist?(layout_file)
        self.read_yaml(File.join(base, '_layouts'), 'recent.html')
      else
        # Fallback: try reading from theme gem layouts
        self.data = {}
        self.content = ''
      end

      self.data.merge!(
        'title' => '最近',
        'posts' => posts,
        'paginator' => paginator
      )
    end
  end
end
