import {defineOperationApi} from "@directus/extensions-sdk";
import GithubClient from "./github-client";
import {useService} from "../utils";
import {AxiosError} from "axios";

const PER_PAGE: number = 200;

export default defineOperationApi({
    id: 'github-loader',
    handler: async function (_, context): Promise<GithubRepository[] | Error> {
        const { logger } = context;
        const repositoryService = await useService('repository', context);
        const commitsService = await useService('commits', context);
        const githubClient = new GithubClient(context.env.GITHUB_TOKEN);

        logger.info('[Github Loader] Start loading repositories')

        for (let page = 1; page < 2; page++) { // Load only first page as PoC
            logger.info(`[Github Loader] page - ${page}`)
            try {
                const repositories: GithubRepository[] = await githubClient.loadRepositories(page, PER_PAGE);
                logger.info(`[Github Loader] Upsert repositories - ${repositories.length}`)

                for (const repository of repositories) {

                    await repositoryService.upsertMany([{
                        id: repository.id,
                        url: repository.url,
                        description: repository.description,
                        name_with_namespace: repository.full_name,
                        archived: repository.archived,
                        personal: repository.private,
                        last_activity_at: repository.updated_at
                    }])

                    const commits: GithubCommit[] = await githubClient.loadCommits(repository, 10);
                    commits.length && await commitsService.upsertMany(commits.map(commit => ({
                        id: commit.sha,
                        short_id: commit.sha,
                        created_at: commit.commit.committer.date,
                        parent_ids: commit.parents.map(parent => parent.sha),
                        title: commit.commit.message,
                        message: commit.commit.message,
                        author_name: commit.commit.author.name,
                        author_email: commit.commit.author.email,
                        authored_date: commit.commit.author.date,
                        committer_name: commit.commit.committer.name,
                        committer_email: commit.commit.committer.email,
                        committed_date: commit.commit.committer.date,
                        web_url: commit.sha,
                        repository: repository.url
                    })))

                    logger.info(`[Github Loader] Updated repository ${repository.url} with ${commits.length} commits`)
                }

            } catch (e) {
                if (e instanceof AxiosError && e.response?.status === 401) {
                    logger.error(`[Github Loader] Error: Unauthorized; ${JSON.stringify(e.response.data)}`)
                    return [];
                }
                logger.error(e, `[Github Loader] Error`)
            }
        }

        logger.info('[Github Loader] Completed')
        return [];
    }
});