import { Octokit } from "@octokit/rest";


// export const TOKEN

// export const GitHubApp = new Octokit({
//     authStrategy: createAppAuth,
//     auth:{
//         privateKey: process.env.GITHUB_PRIVATEKEY!,
//         appId: 216439,
//         clientId: process.env.GITHUB_CLIENTID!,
//         clientSecret: process.env.GITHUB_CLIENTSECRET
//     },
// });

// console.log("Process: ", process.env.GITHUB_PRIVATEKEY);

// export const GitHubConnect = new Octokit({
//     authStrategy: createAppAuth,
//     auth: {
//         appId: 216439,
//         installationId: 27019422,
//         privateKey: process.env.GITHUB_PRIVATEKEY!,
//         // clientId: process.env.GITHUB_CLIENTID!,
//         // clientSecret: process.env.GITHUB_CLIENTSECRET,
//     }
// });

// export const GitHubInstall = GitHubConnect.auth({
//     type: "installation",
//     installationId: 27019422,
//     //factory: ({FactoryInstallation<InstallationAuthOptionsWithFactory>,...auth}) => new Octokit({auth}),//({ octokitOptions, ...auth }) => new Octokit({ ...octokitOptions, auth }),
// });

export default async (client: Octokit): Promise<void> => {
    // console.log("Process: ", process.env.GITHUB_PRIVATEKEY);
    // GitHubConnect = new Octokit({
    //     authStrategy: createAppAuth,
    //     auth: {
    //         appId: 216439,
    //         installationId: 27019422,
    //         privateKey: process.env.GITHUB_PRIVATEKEY!,
    //         clientId: process.env.GITHUB_CLIENTID!,
    //         clientSecret: process.env.GITHUB_CLIENTSECRET,
    //     }
    // });
    
    // client.paginate(
    //     "GET /repos/{owner}/{repo}/issues",
    //     { owner: "Legion-Studios", repo: "Legion-Issue-Tracker" },
    //     (response) => response.data.map((issue) => issue.title)
    //   )
    //   .then((issueTitles) => {
    //     console.log("Issue:", issueTitles);
    //     // issueTitles is now an array with the titles only
    //   });
    // console.log((await client.rest.issues.listForRepo());

    // var test = (await client.request('GET /installation/repositories', {})).data;
    // console.log("Testme",test);
    console.log("Github successfully authenticated!");
};

// export const ConnectToGithub = async () => {

//     // git.auth(ty)
//     var test =  install.request("GET /repos/{owner}/{repo}/issues", {
//         owner: "Legion-Studios",
//         repo: "Legion-Issue-Tracker",
//     });
//     // const iterator = await git.paginate.iterator(git.rest.issues.listForRepo, {
//     //     owner: "Legion-Studios",
//     //     repo: "Legion-Issue-Tracker",
//     //     per_page: 10,
//     //   });
//     // for await(var {data:issues} of iterator) {
//     //     for (var issue of issues) {
//     //         console.log("Issue #%d: %s", issue.number, issue.title);
//     //     };
//     // };
//     console.log("Git Response", test);
//     // var test = await git.request("GET /user");
//     // console.log("Github Response: ", test);
// }

// export const AuthGitHub = async () => {
//     const auth = createAppAuth({
//         appId: 216439,
//         privateKey: process.env.GITHUB_PRIVATEKEY!,
//         clientId: process.env.GITHUB_CLIENTID!,
//         clientSecret: process.env.GITHUB_CLIENTSECRET
//     });
//     const appAuthentication = await auth({
//         type: "app"
//     });
// };


// export const GitHubAppInfo: {} = {
//     data: await GitHubApp.request("GET /user")
// }
