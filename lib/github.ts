import { Octokit } from "@octokit/rest";

// Gunakan environment variable dengan fallback yang aman
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || ''
});

// Tipe yang lebih ketat dan deskriptif
export type Project = {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  language?: string | null;
  stars?: number;
  readme: string;
}

// Fungsi retry yang lebih robust dengan timeout eksponensial
async function fetchWithRetry<T>(
  fetchFunction: () => Promise<T>, 
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fetchFunction();
    } catch (error: any) {
      // Tangani rate limit secara lebih komprehensif
      if (error.status === 403 && error.message.includes('API rate limit exceeded')) {
        const resetTime = error.response?.headers?.['x-ratelimit-reset'] 
          ? parseInt(error.response.headers['x-ratelimit-reset'], 10) * 1000 
          : Date.now() + (baseDelay * Math.pow(2, attempt));
        
        const waitTime = Math.max(resetTime - Date.now() + 1000, baseDelay * Math.pow(2, attempt));
        
        console.warn(`Rate limit exceeded. Attempt ${attempt + 1}. Waiting for ${waitTime / 1000} seconds.`);
        
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else if (attempt === maxRetries - 1) {
        console.error('Failed to fetch after max retries:', error);
        throw error;
      }
    }
  }
  throw new Error("Max retries reached unexpectedly");
}

export async function getGitHubProjects(username: string): Promise<Project[]> {
  try {
    // Validasi username
    if (!username || username.trim() === '') {
      console.error('Invalid GitHub username');
      return [];
    }

    const response = await fetchWithRetry(() => octokit.repos.listForUser({
      username,
      sort: 'updated',
      direction: 'desc',
      per_page: 15
    }));

    // Gunakan Promise.allSettled untuk menangani kesalahan individu
    const projectResults = await Promise.allSettled(response.data.map(async (repo) => {
      let readme = '';
      try {
        const readmeResponse = await fetchWithRetry(() => octokit.repos.getReadme({
          owner: username,
          repo: repo.name,
        }));
        readme = Buffer.from(readmeResponse.data.content, 'base64').toString('utf-8');
      } catch (error) {
        console.warn(`README fetch failed for ${repo.name}:`, error);
        readme = 'README tidak tersedia.';
      }

      // Filter dan bersihkan data
      return {
        id: repo.name || 'unknown-repo',
        title: repo.name || 'Unnamed Project',
        description: (repo.description || 'Tidak ada deskripsi').trim(),
        link: repo.html_url || '',
        tags: (repo.topics || []).filter(Boolean), // Hapus tag kosong
        language: repo.language || null,
        stars: repo.stargazers_count || 0,
        readme: readme.length > 0 ? readme : 'README kosong.'
      } as Project;
    }));

    // Filter hanya project yang berhasil
    return projectResults
      .filter((result): result is PromiseFulfilledResult<Project> => result.status === 'fulfilled')
      .map(result => result.value);

  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}