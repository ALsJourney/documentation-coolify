import { resolve, join, dirname } from 'path';
import { readFileSync, readdirSync, statSync, mkdirSync, existsSync, writeFileSync } from 'fs';
import type { Plugin } from 'vite';

export interface robot8oPluginOptions {
  /**
   * Directory containing markdown files to convert
   * @default 'docs'
   */
  docsDir?: string;
}

interface FileMap {
  [key: string]: string;  // path: content mapping
}

/**
 * Plugin to convert markdown files to text files, RAG chain.
 */
export default function robot8oPlugin(options: robot8oPluginOptions = {}): Plugin {
  const docsDir = options.docsDir || 'docs';
  const webhookUrl = 'https://n8n.darweb.io/webhook-test/kv';

  const ensureDirectoryExists = (filePath: string) => {
    const dir = dirname(filePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  };

  return {
    name: 'vitepress-plugin-robo8o',
    
    async closeBundle() {
      try {
        const docsPath = resolve(process.cwd(), docsDir);
        const markdownFiles = getAllMarkdownFiles(docsPath);
        const convertedDir = resolve(docsPath, '.vitepress/dist/converted');
        const fileMap: FileMap = {};
        
        // Ensure converted directory exists
        if (!existsSync(convertedDir)) {
          mkdirSync(convertedDir, { recursive: true });
        }

        for (const file of markdownFiles) {
          try {
            const relativePath = file.replace(docsPath, '');
            
            if (!relativePath.startsWith('\\') && !relativePath.startsWith('/')) {
              console.warn(`Skipping file with invalid path: ${file}`);
              continue;
            }
            
            const outputPath = resolve(convertedDir, relativePath.slice(1).replace('.md', '.txt'));
            const content = readFileSync(file, 'utf-8');
            const convertedContent = convertMarkdownToText(content);

            // Store in map using normalized path without .txt extension
            const normalizedPath = relativePath.slice(1).replace('.md', '').replace(/\\/g, '/');
            fileMap[normalizedPath] = convertedContent;

            // Write the converted file
            ensureDirectoryExists(outputPath);
            writeFileSync(outputPath, convertedContent, 'utf-8');

            console.log(`Converted: ${relativePath} -> .vitepress/dist/converted${relativePath.replace('.md', '.txt')}`);
          } catch (fileError) {
            console.error(`Error processing file ${file}:`, fileError);
          }
        }

        // Write the file map
        const mapPath = resolve(convertedDir, 'kvmap.json');
        writeFileSync(mapPath, JSON.stringify(fileMap, null, 2), 'utf-8');
        
        // Send POST request to webhook
        try {
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fileMap),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          console.log('\nROBO8O: Successfully sent file map to webhook');
        } catch (webhookError) {
          console.error('ROBO8O: Error sending file map to webhook:', webhookError);
        }

        console.log('\nROBO8O: Generated file map at .vitepress/dist/converted/kvmap.json');
        console.log('\nROBO8O: Conversion complete');
      } catch (error) {
        console.error('ROBO8O: Error during conversion:', error);
      }
    }
  };
}

/**
 * Recursively find all markdown files in a directory
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of absolute file paths
 */
function getAllMarkdownFiles(dir: string): string[] {
  let results: string[] = [];
  try {
    const files = readdirSync(dir);

    for (const file of files) {
      const filePath = join(dir, file);
      const stat = statSync(filePath);

      // Skip the .vitepress directory and node_modules
      if (stat.isDirectory() && !['node_modules', '.vitepress', 'dist' , 'api-reference'].includes(file)) {
        results = results.concat(getAllMarkdownFiles(filePath));
      } else if (file.endsWith('.md')) {
        results.push(filePath);
      }
    }
  } catch (error) {
    console.error('ROBO8O: Error reading directory:', error);
  }

  return results;
}

/**
 * Convert markdown content to plain text
 * @param {string} markdown - Markdown content
 * @returns {string} Plain text content
 */
function convertMarkdownToText(markdown: string): string {
  return markdown
    // 1. Remove metadata and containers
    .replace(/^---[\s\S]*?---/, '\n')                 // Remove YAML frontmatter
    .replace(/<[^>]+>/g, '')                          // Remove HTML tags but preserve content
    .replace(/:::\s*\w+\s*/g, '\n')                   // Remove VitePress container starts
    .replace(/:::/g, '\n')                            // Remove VitePress container ends

    // 2. Add spacing around structural elements
    .replace(/\n(#\s[^\n]*)/g, '\n\n\n\n$1\n')       // Add extra space around h1
    .replace(/\n(##\s[^\n]*)/g, '\n\n\n$1\n')        // Add extra space around h2
    .replace(/\n(###\s[^\n]*)/g, '\n\n$1\n')         // Add extra space around h3
    .replace(/\n(####.*)/g, '\n\n$1\n')              // Add space around h4+
    .replace(/\n(```[^\n]*)/g, '\n\n$1')             // Add double space before code blocks
    .replace(/(```)\s*\n/g, '$1\n\n\n')              // Add triple space after code blocks

    // 3. Preserve and normalize line breaks
    .split('\n')                                      // Split into lines
    .map(line => line.trim())                         // Trim each line
    .join('\n')                                       // Rejoin with line breaks
    .replace(/\n{5,}/g, '\n\n\n\n')                  // Max 4 consecutive line breaks
    .replace(/\s{2,}/g, ' ')                          // Collapse multiple spaces to single
    .trim();
}