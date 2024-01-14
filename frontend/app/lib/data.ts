export async function getAllJobs() {
  const res = await fetch(`${process.env.appKey}/jobs`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  const jobs = await res.json();
  console.log(jobs);
  return {
    props: {
      jobs,
    },
  };
}
