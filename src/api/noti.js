let domain = "https://apiat.stdmcl.com:11443/api/v1"

export async function getList(data) {

  const options = {
    method: "POST",
    body: JSON.stringify({ "toId": data.noti, "title": data.title }),
  };

  let res = await fetch(
    domain + "/notice/list2?page=" + data.page,
    options
  ).then((res) => res.json());

  return res;

}