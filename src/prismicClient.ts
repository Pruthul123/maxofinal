import * as prismic from '@prismicio/client';

const repositoryName = import.meta.env.VITE_PRISMIC_REPO_NAME as string | undefined;
const accessToken = import.meta.env.VITE_PRISMIC_ACCESS_TOKEN as string | undefined;

export function createPrismicClient() {
  if (!repositoryName) return null;

  return prismic.createClient(prismic.getRepositoryEndpoint(repositoryName), {
    accessToken: accessToken || undefined,
  });
}
