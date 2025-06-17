import { fileURLToPath, URL } from 'node:url'
import yaml from 'vite-plugin-yaml'
import llmstxt from 'vitepress-plugin-llms'
import coolbotPlugin from './plugins/vitepress-plugin-coolbot';
import { defineConfig } from 'vitepress'
import { useSidebar } from 'vitepress-openapi'
import spec from './theme/openapi.json' with { type: 'json' }
import container from 'markdown-it-container'
import { bundledLanguages } from 'shiki'
import { join, dirname } from 'node:path'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { loadEnv } from 'vitepress'
const env = loadEnv('', process.cwd())
const sidebar = useSidebar({ spec, collapsible: true })

// Add SSH to bundled languages
bundledLanguages['ssh'] = {
  id: 'ssh',
  scopeName: 'source.ssh-config',
  path: join(dirname(fileURLToPath(import.meta.url)), '../../node_modules/shiki/languages/ssh-config.tmLanguage.json')
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: "Coolify Docs",
  description: "Self hosting with superpowers: An open-source & self-hostable Heroku / Netlify / Vercel alternative.",
  appearance: 'dark', // 'dark' allows user to change theme, 'force-dark' doesn't allow user to change theme
  base: '/docs/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  sitemap: {
    hostname: 'https://coolify.io/docs/'
  },

  head: [
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Coolify Docs' }],
    ['meta', { property: 'og:url', content: 'https://coolify.io/docs/' }],
    ['meta', { property: 'og:description', content: 'Self hosting with superpowers: An open-source & self-hostable Heroku / Netlify / Vercel alternative.' }],
    ['meta', { property: 'og:image', content: 'https://coolcdn.b-cdn.net/assets/coolify/og-image-docs.png' }],
    ['meta', { property: 'twitter:site', content: '@coolifyio' }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:title', content: 'Coolify Docs' }],
    ['meta', { property: 'twitter:description', content: 'Self hosting with superpowers: An open-source & self-hostable Heroku / Netlify / Vercel alternative.' }],
    ['meta', { property: 'twitter:url', content: 'https://coolify.io/docs/' }],
    ['meta', { property: 'twitter:image', content: 'https://coolcdn.b-cdn.net/assets/coolify/og-image-docs.png' }],
    ['link', { rel: 'icon', href: '/docs/coolify-logo-transparent.png' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['script', { defer: 'true', src: 'https://analytics.coollabs.io/js/script.tagged-events.js', 'data-domain': env.VITE_ANALYTICS_DOMAIN ?? 'coolify.io/docs' }],
    ['script', { async: 'true', src: '/docs/trieve-user-script.js' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    carbonAds: {
      code: 'CW7IPKJJ',
      placement: 'coolifyio'
    },
    logo: '/coolify-logo-transparent.png',
    nav: [
      { text: 'Coolify Cloud', link: 'https://coolify.io/pricing/' },
      {
        text: 'Resources',
        items: [
          { text: 'Releases', link: 'https://github.com/coollabsio/coolify/releases' },
          { text: 'Support', link: 'https://coolify.io/' },
          { text: 'Sponsor us', link: 'https://coolify.io/sponsorships/' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/coollabsio/documentation-coolify/tree/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/coollabsio/coolify' },
      { icon: 'discord', link: 'https://coollabs.io/discord' },
      { icon: 'x', link: 'https://x.com/coolifyio' }
    ],

    sidebar: [
      {
        text: 'Get Started',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/get-started/introduction' },
          {
            text: 'Installation',
            link: '/get-started/installation',
            collapsed: false,
            items: [
              { text: 'Upgrade', link: '/get-started/upgrade' },
              { text: 'Downgrade', link: '/get-started/downgrade' },
              { text: 'Uninstallation', link: '/get-started/uninstallation' },
            ]
          },
          { text: 'Cloud', link: '/get-started/cloud' },
          { text: 'Usage', link: '/get-started/usage' },
          {
            text: 'Concepts', link: '/get-started/concepts',
            collapsed: true,
            items: [
              { text: 'Screenshots', link: '/get-started/screenshots' },
              { text: 'Videos', link: '/get-started/videos' },
            ]
          },
          { text: 'Team', link: '/get-started/team' },
          { text: 'Support', link: '/get-started/support' },
          { text: 'Sponsors', link: '/get-started/sponsors' },
          {
            text: 'Contribute',
            collapsed: true,
            items: [
              { text: 'Coolify', link: '/get-started/contribute/coolify' },
              { text: 'New Service', link: '/get-started/contribute/service' },
              { text: 'Documentation', link: '/get-started/contribute/documentation' },
            ],
          },

        ],
      },
      {
        text: 'Builds',
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/builds/introduction' },
          {
            text: 'Build Packs',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/builds/packs/overview' },
              { text: 'Static', link: '/builds/packs/static' },
              { text: 'Nixpacks', link: '/builds/packs/nixpacks' },
              { text: 'Dockerfile', link: '/builds/packs/dockerfile' },
              { text: 'Docker Compose', link: '/builds/packs/docker-compose' },
            ]
          },
          { text: 'Build Servers', link: '/builds/servers' },
        ],
      },
      {
        text: 'Applications',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/applications/index',
            items: [
              { text: 'Django', link: '/applications/django' },
              { text: 'Jekyll', link: '/applications/jekyll' },
              { text: 'Laravel', link: '/applications/laravel' },
              { text: 'Phoenix', link: '/applications/phoenix' },
              { text: 'Ruby on Rails', link: '/applications/rails' },
              { text: 'Symfony', link: '/applications/symfony' },
              { text: 'Next.js', link: '/applications/nextjs' },
              { text: 'Vite', link: '/applications/vite' },
              { text: 'Vue', link: '/applications/vuejs' },
              { text: 'Nuxt', link: '/applications/nuxt' },
              { text: 'SvelteKit', link: '/applications/svelte-kit' },
            ]
          }
        ],
      },
      {
        text: 'Databases',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/databases/index',
            items: [
              { text: 'Database SSL', link: '/databases/ssl' },
              { text: 'Backups', link: '/databases/backups' },
              { text: 'MySQL', link: '/databases/mysql' },
              { text: 'MariaDB', link: '/databases/mariadb' },
              { text: 'PostgreSQL', link: '/databases/postgresql' },
              { text: 'MongoDB', link: '/databases/mongodb' },
              { text: 'Redis', link: '/databases/redis' },
              { text: 'DragonFly', link: '/databases/dragonfly' },
              { text: 'KeyDB', link: '/databases/keydb' },
              { text: 'Clickhouse', link: '/databases/clickhouse' },
            ]
          }
        ],
      },
      {
        text: 'Services',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/services/overview',
            items: [
              { text: 'ActivePieces', link: '/services/activepieces' },
              { text: 'Actual Budget', link: '/services/actualbudget' },
              { text: 'Affine', link: '/services/affine' },
              { text: 'AnythingLLM', link: '/services/anythingllm' },
              { text: 'Apprise API', link: '/services/apprise-api' },
              { text: 'Appsmith', link: '/services/appsmith' },
              { text: 'Appwrite', link: '/services/appwrite' },
              { text: 'Argilla', link: '/services/argilla' },
              { text: 'Audiobookshelf', link: '/services/audiobookshelf' },
              { text: 'Authentik', link: '/services/authentik' },
              { text: 'Baby Buddy', link: '/services/babybuddy' },
              { text: 'Beszel', link: '/services/beszel' },
              { text: 'Bitcoin Core', link: '/services/bitcoin-core' },
              { text: 'BookStack', link: '/services/bookstack' },
              { text: 'Browserless', link: '/services/browserless' },
              { text: 'Budibase', link: '/services/budibase' },
              { text: 'BudgE', link: '/services/budge' },
              { text: 'Bugsink', link: '/services/bugsink' },
              { text: 'Cal.com', link: '/services/calcom' },
              { text: 'Calibre Web', link: '/services/calibre-web' },
              { text: 'Castopod', link: '/services/castopod' },
              { text: 'Change Detection', link: '/services/changedetection' },
              { text: 'Chaskiq', link: '/services/chaskiq' },
              { text: 'Chatwoot', link: '/services/chatwoot' },
              { text: 'Checkmate', link: '/services/checkmate' },
              { text: 'ClassicPress', link: '/services/classicpress' },
              { text: 'CloudBeaver', link: '/services/cloudbeaver' },
              { text: 'Cloudflared', link: '/services/cloudflared' },
              { text: 'Cockpit', link: '/services/cockpit' },
              { text: 'Code Server', link: '/services/code-server' },
              { text: 'ConvertX', link: '/services/convertx' },
              { text: 'Convex', link: '/services/convex' },
              { text: 'Cryptgeon', link: '/services/cryptgeon' },
              { text: 'CyberChef', link: '/services/cyberchef' },
              { text: 'Dashboard', link: '/services/dashboard' },
              { text: 'Dashy', link: '/services/dashy' },
              { text: 'Deno KV', link: '/services/denoKV' },
              { text: 'Directus', link: '/services/directus' },
              { text: 'Docker Registry', link: '/services/docker-registry' },
              { text: 'Docmost', link: '/services/docmost' },
              { text: 'Documenso', link: '/services/documenso' },
              { text: 'Docuseal', link: '/services/docuseal' },
              { text: 'DokuWiki', link: '/services/dokuwiki' },
              { text: 'Dolibarr', link: '/services/dolibarr' },
              { text: 'Dozzle', link: '/services/dozzle' },
              { text: 'Drupal', link: '/services/drupal' },
              { text: 'Duplicati', link: '/services/duplicati' },
              { text: 'Easy Appointments', link: '/services/easyappointments' },
              { text: 'Emby', link: '/services/emby' },
              { text: 'Emby Stat', link: '/services/emby-stat' },
              { text: 'Evolution API', link: '/services/evolution-api' },
              { text: 'Faraday', link: '/services/faraday' },
              { text: 'Fider', link: '/services/fider' },
              { text: 'Filebrowser', link: '/services/filebrowser' },
              { text: 'FileFlows', link: '/services/fileflows' },
              { text: 'Firefly III', link: '/services/firefly-iii' },
              { text: 'Firefox', link: '/services/firefox' },
              { text: 'Flipt', link: '/services/flipt' },
              { text: 'Flowise', link: '/services/flowise' },
              { text: 'Forgejo', link: '/services/forgejo' },
              { text: 'Formbricks', link: '/services/formbricks' },
              { text: 'Foundry VTT', link: '/services/foundryvtt' },
              { text: 'FreeScout', link: '/services/freescout' },
              { text: 'FreshRSS', link: '/services/freshrss' },
              { text: 'Ghost', link: '/services/ghost' },
              { text: 'Gitea', link: '/services/gitea' },
              { text: 'GitLab', link: '/services/gitlab' },
              { text: 'Glance', link: '/services/glance' },
              { text: 'Glances', link: '/services/glances' },
              { text: 'GlitchTip', link: '/services/glitchtip' },
              { text: 'Gotenberg', link: '/services/gotenberg' },
              { text: 'Grafana', link: '/services/grafana' },
              { text: 'Grocy', link: '/services/grocy' },
              { text: 'Heimdall', link: '/services/heimdall' },
              { text: 'HeyForm', link: '/services/heyform' },
              { text: 'Hoarder', link: '/services/hoarder' },
              { text: 'Homarr', link: '/services/homarr' },
              { text: 'Homepage', link: '/services/homepage' },
              { text: 'Hoppscotch', link: '/services/hoppscotch' },
              { text: 'Immich', link: '/services/immich' },
              { text: 'Infisical', link: '/services/infisical' },
              { text: 'Invoice Ninja', link: '/services/invoice-ninja' },
              { text: 'IT Tools', link: '/services/it-tools' },
              { text: 'Jellyfin', link: '/services/jellyfin' },
              { text: 'Jenkins', link: '/services/jenkins' },
              { text: 'Joomla', link: '/services/joomla' },
              { text: 'Joplin', link: '/services/joplin' },
              { text: 'Jupyter Notebook Python', link: '/services/jupyter-notebook-python' },
              { text: 'Keycloak', link: '/services/keycloak' },
              { text: 'Kimai', link: '/services/kimai' },
              { text: 'Kuzzle', link: '/services/kuzzle' },
              { text: 'Label Studio', link: '/services/labelstudio' },
              { text: 'Langfuse', link: '/services/langfuse' },
              { text: 'LibreOffice', link: '/services/libreoffice' },
              { text: 'LibreTranslate', link: '/services/libretranslate' },
              { text: 'Listmonk', link: '/services/listmonk' },
              { text: 'Litellm', link: '/services/litellm' },
              { text: 'Litequeen', link: '/services/litequeen' },
              { text: 'Logto', link: '/services/logto' },
              { text: 'Lowcoder', link: '/services/lowcoder' },
              { text: 'Mailpit', link: '/services/mailpit' },
              { text: 'Martin', link: '/services/martin' },
              { text: 'Mattermost', link: '/services/mattermost' },
              { text: 'Mautic 5', link: '/services/mautic5' },
              { text: 'Maybe', link: '/services/maybe' },
              { text: 'Mealie', link: '/services/mealie' },
              { text: 'MediaWiki', link: '/services/mediawiki' },
              { text: 'MeiliSearch', link: '/services/meilisearch' },
              { text: 'Metabase', link: '/services/metabase' },
              { text: 'Metube', link: '/services/metube' },
              { text: 'Minecraft', link: '/services/minecraft' },
              { text: 'MindsDB', link: '/services/mindsdb' },
              { text: 'MinIO', link: '/services/minio' },
              { text: 'Mixpost', link: '/services/mixpost' },
              { text: 'Moodle', link: '/services/moodle' },
              { text: 'Mosquitto', link: '/services/mosquitto' },
              { text: 'N8N', link: '/services/n8n' },
              { text: 'Neon WS Proxy', link: '/services/neon-ws-proxy' },
              { text: 'Next Image Transformation', link: '/services/next-image-transformation' },
              { text: 'Nextcloud', link: '/services/nextcloud' },
              { text: 'NocoDB', link: '/services/nocodb' },
              { text: 'NodeBB', link: '/services/nodebb' },
              { text: 'Ntfy', link: '/services/ntfy' },
              { text: 'Odoo', link: '/services/odoo' },
              { text: 'Ollama', link: '/services/ollama' },
              { text: 'OneDev', link: '/services/onedev' },
              { text: 'Open WebUI', link: '/services/open-webui' },
              { text: 'Openblocks', link: '/services/openblocks' },
              { text: 'Organizr', link: '/services/organizr' },
              { text: 'osTicket', link: '/services/osticket' },
              { text: 'Outline', link: '/services/outline' },
              { text: 'Overseerr', link: '/services/overseerr' },
              { text: 'ownCloud', link: '/services/owncloud' },
              { text: 'Pairdrop', link: '/services/pairdrop' },
              { text: 'Paperless', link: '/services/paperless' },
              { text: 'Paymenter', link: '/services/paymenter' },
              { text: 'Penpot', link: '/services/penpot' },
              { text: 'phpMyAdmin', link: '/services/phpmyadmin' },
              { text: 'Plane', link: '/services/plane' },
              { text: 'Plausible Analytics', link: '/services/plausible' },
              { text: 'Plex', link: '/services/plex' },
              { text: 'Plunk', link: '/services/plunk' },
              { text: 'Pocketbase', link: '/services/pocketbase' },
              { text: 'Portainer', link: '/services/portainer' },
              { text: 'PostHog', link: '/services/posthog' },
              { text: 'Postiz', link: '/services/postiz' },
              { text: 'Prefect', link: '/services/prefect' },
              { text: 'PrivateBin', link: '/services/privatebin' },
              { text: 'Prowlarr', link: '/services/prowlarr' },
              { text: 'qBittorrent', link: '/services/qbittorrent' },
              { text: 'Qdrant', link: '/services/qdrant' },
              { text: 'RabbitMQ', link: '/services/rabbitmq' },
              { text: 'Radarr', link: '/services/radarr' },
              { text: 'Rallly', link: '/services/rallly' },
              { text: 'Reactive Resume', link: '/services/reactive-resume' },
              { text: 'Readeck', link: '/services/readeck' },
              { text: 'Redlib', link: '/services/redlib' },
              { text: 'Rocket.Chat', link: '/services/rocketchat' },
              { text: 'SearXNG', link: '/services/searxng' },
              { text: 'Shlink', link: '/services/shlink' },
              { text: 'Slash', link: '/services/slash' },
              { text: 'Snapdrop', link: '/services/snapdrop' },
              { text: 'Soketi', link: '/services/soketi' },
              { text: 'Sonarr', link: '/services/sonarr' },
              { text: 'Sonatype Nexus', link: '/services/nexus' },
              { text: 'StatusNook', link: '/services/statusnook' },
              { text: 'Stirling PDF', link: '/services/stirling-pdf' },
              { text: 'Strapi', link: '/services/strapi' },
              { text: 'Supabase', link: '/services/supabase' },
              { text: 'Superset', link: '/services/superset' },
              { text: 'SuperTokens', link: '/services/supertokens' },
              { text: 'Syncthing', link: '/services/syncthing' },
              { text: 'Teable', link: '/services/teable' },
              { text: 'Tolgee', link: '/services/tolgee' },
              { text: 'Traccar', link: '/services/traccar' },
              { text: 'Transmission', link: '/services/transmission' },
              { text: 'Trigger', link: '/services/trigger' },
              { text: 'Umami', link: '/services/umami' },
              { text: 'Unleash', link: '/services/unleash' },
              { text: 'Unsend', link: '/services/unsend' },
              { text: 'Unstructured', link: '/services/unstructured' },
              { text: 'Uptime Kuma', link: '/services/uptime-kuma' },
              { text: 'Vaultwarden', link: '/services/vaultwarden' },
              { text: 'Vikunja', link: '/services/vikunja' },
              { text: 'VvvebJS', link: '/services/vvveb' },
              { text: 'Wakapi', link: '/services/wakapi' },
              { text: 'Weaviate', link: '/services/weaviate' },
              { text: 'Web Check', link: '/services/web-check' },
              { text: 'Weblate', link: '/services/weblate' },
              { text: 'Whoogle', link: '/services/whoogle' },
              { text: 'Wiki.js', link: '/services/wikijs' },
              { text: 'Windmill', link: '/services/windmill' },
              { text: 'WireGuard Easy', link: '/services/wireguard-easy' },
              { text: 'WordPress', link: '/services/wordpress' },
              { text: 'Zipline', link: '/services/zipline' }
            ]
          }
        ],
      },
      {
        text: 'Integrations',
        collapsed: true,
        items: [
          { text: 'Webstudio', link: '/integrations/webstudio.md' },
        ],
      },
      {
        text: 'Knowledge Base',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/knowledge-base/overview',
            items: [
              {
                text: 'Internal',
                collapsed: true,
                items: [
                  {
                    text: 'Scalability',
                    link: '/knowledge-base/internal/scalability'
                  },
                  {
                    text: 'Terminal',
                    link: '/knowledge-base/internal/terminal'
                  }
                ]
              },
              {
                text: 'Self-hosted Instance',
                collapsed: true,
                items: [
                  { text: 'Monitoring', link: '/knowledge-base/monitoring' },
                  { text: 'Notifications', link: '/knowledge-base/notifications' },
                  { text: 'Coolify Updates', link: '/knowledge-base/self-update' },
                  { text: 'Commands', link: '/knowledge-base/commands' },
                  { text: 'Delete User', link: '/knowledge-base/delete-user' },
                  { text: 'OAuth', link: '/knowledge-base/oauth' },
                  { text: 'Default Root User', link: '/knowledge-base/create-root-user-with-env' },
                  { text: 'Custom Docker Network', link: '/knowledge-base/define-custom-docker-network-with-env' },
                  { text: 'Custom Docker Registry', link: '/knowledge-base/custom-docker-registry' },
                  { text: 'Change Localhost Key', link: '/knowledge-base/change-localhost-key' },
                ]
              },
              {
                text: 'DNS & Domains',
                collapsed: true,
                items: [
                  { text: 'DNS Configuration', link: '/knowledge-base/dns-configuration' },
                  { text: 'Domains', link: '/knowledge-base/domains' },
                ]
              },
              {
                text: 'Destinations',
                collapsed: true,
                items: [
                  { text: 'Overview', link: '/knowledge-base/destinations/index' },
                  { text: 'Creating Destinations', link: '/knowledge-base/destinations/create' },
                  { text: 'Managing Destinations', link: '/knowledge-base/destinations/manage' },
                  { text: 'Multi-Server Deployments', link: '/knowledge-base/destinations/multi-server' },
                  { text: 'Networking', link: '/knowledge-base/destinations/networking' },
                  { text: 'Deleting Destinations', link: '/knowledge-base/destinations/delete' },
                ]
              },
              {
                text: 'Resources',
                collapsed: true,
                items: [
                  { text: 'Environment Variables', link: '/knowledge-base/environment-variables' },
                  { text: 'Persistent Storage', link: '/knowledge-base/persistent-storage' },
                  { text: 'Drain Logs', link: '/knowledge-base/drain-logs' },
                  { text: 'Rolling Updates', link: '/knowledge-base/rolling-updates' },
                  { text: 'Health Checks', link: '/knowledge-base/health-checks' },
                  { text: 'Cron Syntax', link: '/knowledge-base/cron-syntax' },
                ]
              },
              {
                text: 'How-Tos',
                collapsed: true,
                items: [
                  { text: 'Migrate Applications', link: '/knowledge-base/how-to/migrate-apps-different-host' },
                  { text: 'Backup & Restore Coolify', link: '/knowledge-base/how-to/backup-restore-coolify' },
                  { text: 'Load-balancing on Hetzner', link: '/knowledge-base/how-to/hetzner-loadbalancing' },
                  { text: 'WordPress Multisite', link: '/knowledge-base/how-to/wordpress-multisite' },
                  { text: 'Raspberry Pi OS Setup', link: '/knowledge-base/how-to/raspberry-pi-os' },
                  { text: 'Private NPM Registry', link: '/knowledge-base/how-to/private-npm-registry' },
                  { text: 'Ollama with GPU', link: '/knowledge-base/how-to/ollama-with-gpu' },
                ]
              },
              {
                text: 'Git',
                collapsed: true,
                items: [
                  {
                    text: 'Github', collapsed: true, items: [
                      { text: 'Manually Setup GitHub App', link: '/knowledge-base/git/github/manually-setup-github-app' },
                      { text: 'Move Between GitHub Apps', link: '/knowledge-base/git/github/move-between-github-apps' },
                      { text: 'Integrations', link: '/knowledge-base/git/github/integration' },
                      { text: 'Github Actions', link: '/knowledge-base/git/github/github-actions' },
                    ]
                  },
                  {
                    text: 'Gitlab', collapsed: true, items: [
                      { text: 'Integrations', link: '/knowledge-base/git/gitlab/integration' },
                    ]
                  },
                  {
                    text: 'Bitbucket', collapsed: true, items: [
                      { text: 'Integrations', link: '/knowledge-base/git/bitbucket/integration' },
                    ]
                  },
                  {
                    text: 'Gitea', collapsed: true, items: [
                      { text: 'Integrations', link: '/knowledge-base/git/gitea/integration' },
                    ]
                  },
                ]
              },
              {
                text: 'Servers',
                collapsed: true,
                items: [
                  { text: 'Introduction', link: '/knowledge-base/server/introduction' },
                  { text: 'Automated Cleanup', link: '/knowledge-base/server/automated-cleanup' },
                  { text: 'Build Server', link: '/knowledge-base/server/build-server' },
                  { text: 'Firewall', link: '/knowledge-base/server/firewall' },
                  { text: 'Multiple Servers', link: '/knowledge-base/server/multiple-servers' },
                  { text: 'Sentinel and Metrics', link: '/knowledge-base/server/sentinel' },
                  { text: 'Non-root User', link: '/knowledge-base/server/non-root-user' },
                  { text: 'OpenSSH', link: '/knowledge-base/server/openssh' },
                  { text: 'Oracle Cloud', link: '/knowledge-base/server/oracle-cloud' },
                  { text: 'Proxies', link: '/knowledge-base/server/proxies' },
                  { text: 'Server Patching', link: '/knowledge-base/server/patching' },
                  { text: 'Terminal Access', link: '/knowledge-base/server/terminal-access' },
                ]
              },
              {
                text: 'S3',
                collapsed: true,
                items: [
                  { text: 'Introduction', link: '/knowledge-base/s3/introduction' },
                  { text: 'AWS', link: '/knowledge-base/s3/aws' },
                  { text: 'R2', link: '/knowledge-base/s3/r2' },
                ]
              },
              {
                text: 'Docker',
                collapsed: true,
                items: [
                  { text: 'Compose', link: '/knowledge-base/docker/compose' },
                  { text: 'Docker Commands', link: '/knowledge-base/docker/custom-commands' },
                  { text: 'Registry', link: '/knowledge-base/docker/registry' },
                  { text: 'Swarm', link: '/knowledge-base/docker/swarm' },
                ]
              },
              {
                text: 'Cloudflare',
                collapsed: true,
                items: [
                  {
                    text: 'Tunnels',
                    collapsed: true,
                    items: [
                      { text: 'Overview', link: '/knowledge-base/cloudflare/tunnels/overview' },
                      { text: 'All Resources', link: '/knowledge-base/cloudflare/tunnels/all-resource' },
                      { text: 'Single Resource', link: '/knowledge-base/cloudflare/tunnels/single-resource' },
                      { text: 'Server SSH Access', link: '/knowledge-base/cloudflare/tunnels/server-ssh' },
                      { text: 'Full TLS/HTTPS', link: '/knowledge-base/cloudflare/tunnels/full-tls' },
                    ]
                  },
                  { text: 'Origin Certificate', link: '/knowledge-base/cloudflare/origin-cert' },
                ]
              },
              {
                text: 'Proxy',
                collapsed: true,
                items: [
                  {
                    text: 'Traefik',
                    collapsed: true,
                    items: [
                      { text: 'Overview', link: '/knowledge-base/proxy/traefik/overview' },
                      { text: 'Basic Auth', link: '/knowledge-base/proxy/traefik/basic-auth' },
                      { text: 'Custom SSL Certificates', link: '/knowledge-base/proxy/traefik/custom-ssl-certs' },
                      { text: 'Dashboard', link: '/knowledge-base/proxy/traefik/dashboard' },
                      { text: 'Dynamic Configurations', link: '/knowledge-base/proxy/traefik/dynamic-config' },
                      { text: 'Healthcheck', link: '/knowledge-base/proxy/traefik/healthchecks' },
                      { text: 'Load Balancing', link: '/knowledge-base/proxy/traefik/load-balancing' },
                      { text: 'Redirects', link: '/knowledge-base/proxy/traefik/redirects' },
                      { text: 'Wildcard SSL Certificates', link: '/knowledge-base/proxy/traefik/wildcard-certs' },
                      { text: 'Protect Services with Authentik', link: '/knowledge-base/proxy/traefik/protect-services-with-authentik' }
                    ]
                  },
                  {
                    text: 'Caddy',
                    collapsed: true,
                    items: [
                      { text: 'Overview', link: '/knowledge-base/proxy/caddy/overview' },
                      { text: 'Basic Auth', link: '/knowledge-base/proxy/caddy/basic-auth' },
                    ]
                  },
                ]
              },
            ]
          }
        ],
      },
      {
        text: 'API Reference',
        collapsed: true,
        items: [
          {
            text: 'Authorization',
            link: '/api-reference/authorization',
          },
          ...sidebar.generateSidebarGroups({
            linkPrefix: '/api-reference/api/operations/',
          }).map((group) => ({
            ...group,
            collapsed: true
          }))
        ],
      },
      {
        text: 'Troubleshoot',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/troubleshoot/overview' },
          {
            text: 'Installation',
            collapsed: true,
            items: [
              { text: 'Docker Installation Failed', link: '/troubleshoot/installation/docker-install-failed' },
            ]
          },
          {
            text: 'Applications',
            collapsed: true,
            items: [
              { text: 'Bad Gateway', link: '/troubleshoot/applications/bad-gateway.md' },
              { text: 'Failed To Get Access Token During Deployment', link: '/troubleshoot/applications/failed-to-get-token' },
            ]
          },
          {
            text: 'Dashboard',
            collapsed: true,
            items: [
              { text: 'Inaccessible ', link: '/troubleshoot/dashboard/dashboard-inaccessible' },
              { text: 'Very Slow ', link: '/troubleshoot/dashboard/dashboard-slow-performance' },
              { text: 'Disable 2FA Manually', link: '/troubleshoot/dashboard/disable-2fa-manually' },
            ]
          },
          {
            text: 'Docker',
            collapsed: true,
            items: [
              { text: 'Expired GitHub Personal Access Token (PAT)', link: '/troubleshoot/docker/expired-github-personal-access-token' },
            ]
          },
          {
            text: 'Server',
            collapsed: true,
            items: [
              { text: 'Connection Unstable', link: '/troubleshoot/server/connection-issues' },
              { text: 'Crash During Build', link: '/troubleshoot/server/crash-during-build' },
              { text: '2FA Stopped Working', link: '/troubleshoot/server/two-factor-stopped-working' },
              { text: 'Raspberry Pi Crashes', link: '/troubleshoot/server/raspberry-crashes' },
              { text: 'Server Validation Issues', link: '/troubleshoot/server/validation-issues' },
            ]
          },
          {
            text: 'DNS & Domains',
            collapsed: true,
            items: [
              { text: 'Wildcard SSL not working', link: '/troubleshoot/dns-and-domains/wildcard-ssl-certs' },
              { text: "Let's Encrypt not working", link: '/troubleshoot/dns-and-domains/lets-encrypt-not-working' },
            ]
          },
        ],
      },
    ],

  },

  markdown: {
    config: (md) => {
      md.use(container, 'success', {
        validate: (params) => {
          return params.trim().match(/^success\s*(.*)$/)
        },
        render: (tokens, idx) => {
          const m = tokens[idx].info.trim().match(/^success\s+(.*)$/)
          if (tokens[idx].nesting === 1) {
            // opening tag
            return `<div class="custom-block success">${m ? `<p class="custom-block-title">${m[1]}</p>` : ''
              }\n`
          } else {
            // closing tag
            return '</div>\n'
          }
        }
      })
      md.use(tabsMarkdownPlugin)
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    // Configure Shiki with SSH language
    async shikiSetup(shiki) {
      await shiki.loadLanguage('ssh-config')
    },
    // Map ssh to ssh-config
    languageAlias: {
      ssh: 'ssh-config',
    }
  },

  rewrites: {},

  vite: {
    plugins: [
      yaml as any,
      llmstxt({
        ignoreFiles: [
          '/docs/api-reference/api/**/*',
          '**/api-reference/api/**/*'
        ],
      }),
      coolbotPlugin({
        docsDir: 'docs',
        writeRawOutput: false,
        ignoreFolders: [
          'vitepress',
          'api-reference',
          'node_modules',
          'dist'
        ],
      }),
      groupIconVitePlugin({
        customIcon: {
          bruno: 'vscode-icons:file-type-bruno',
          curl: 'simple-icons:curl',
        },
        defaultLabels: [
          'bruno',
          'curl',
          '.ts',
          '.js',
          '.py',
          '.php',
        ],
      }),
    ],
    assetsInclude: ['**/*.yml'],
    build: {
      chunkSizeWarningLimit: 5000
    },
    resolve: {
      alias: [
        {
          find: /^.*\/VPHero\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/Landing/HeroHeader.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPBadge\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPBadge.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPNavBar.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPSidebar\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPSidebar.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPFeatures\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPFeatures.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPFeature\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPFeature.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPLocalNav\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPLocalNav.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPDocAside\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPDocAside.vue', import.meta.url)
          )
        }
      ]
    }
  }
})
