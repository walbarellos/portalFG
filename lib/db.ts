import fs from 'fs/promises';
import path from 'path';

// Define the Post interface
export interface Post {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  image: string;
  content: string;
  createdAt: string;
  author: string;
}

const dataDir = path.join(process.cwd(), 'data');
const postsFile = path.join(dataDir, 'posts.json');

// Helper to ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const data = await fs.readFile(postsFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    // If file doesn't exist, return empty array or seed data
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

export async function createPost(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
  await ensureDataDir();
  const posts = await getPosts();

  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  posts.unshift(newPost); // Add to beginning

  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
  return newPost;
}

export async function updatePost(slug: string, updatedData: Partial<Post>): Promise<Post | null> {
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.slug === slug);

  if (index === -1) return null;

  const updatedPost = { ...posts[index], ...updatedData };
  posts[index] = updatedPost;

  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
  return updatedPost;
}

export async function deletePost(slug: string): Promise<boolean> {
  const posts = await getPosts();
  const filteredPosts = posts.filter((p) => p.slug !== slug);

  if (posts.length === filteredPosts.length) return false;

  await fs.writeFile(postsFile, JSON.stringify(filteredPosts, null, 2));
  return true;
}

export async function getCategories(): Promise<string[]> {
  const categoriesFile = path.join(dataDir, 'categories.json');
  try {
    const data = await fs.readFile(categoriesFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}
