import axios, {AxiosResponse} from "axios";

const GITHUB_URL = `https://api.github.com`;

class GitlabClient {

    githubOrg: string;
    githubToken: string;
    headers: Record<string, string> = {};

    constructor(githubToken: string, githubOrg: string = "webgoat") {
        this.githubOrg = githubOrg;
        this.githubToken = githubToken;
        this.headers = {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `Bearer ${githubToken}` // Replace with your GitHub token
        }
    }

    async loadRepositories(page: number, perPage: number = 100): Promise<GithubRepository[]> {
        return axios.get<GithubRepository[]>(GITHUB_URL + `/orgs/${this.githubOrg}/repos?page=${page}per_page=${perPage}`, {
            headers: this.headers
        })
            .then((response: AxiosResponse) => {
                return response.data
            })
    }

    async loadCommits(repository: GithubRepository, perPage: number = 100): Promise<GithubCommit[]> {
        return axios.get<GithubCommit[]>(GITHUB_URL + `/repos/${this.githubOrg}/${repository.name}/commits?&per_page=${perPage}`, {
            headers: this.headers
        })
            .then((response: AxiosResponse) => {
                return response.data
            })
    }
}

export default GitlabClient;