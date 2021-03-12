import https from "https";

export default function ({ $axios, redirect }) {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  $axios.onRequest(config => {
    config.httpsAgent = agent;
    console.log("Making request to " + config.url);
  });

  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status);
  //   if (code === 400) {
  //     redirect("/400");
  //   }
  // });
}
