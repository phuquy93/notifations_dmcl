let domain = "https://apiat.stdmcl.com:11443/api/v1"

export async function getList(data) {

  const options = {
    method: "POST",
    body: JSON.stringify({ "toId": data.noti, "title": data.title, "status": data.status, "date_start": data.date_start != null ? data.date_start.toLocaleString("en-CA").split(",")[0] : "", "date_end": data.date_end != null ? data.date_end.toLocaleString("en-CA").split(",")[0] : "" }),
  };

  let res = await fetch(
    domain + "/notice/list2?page=" + data.page,
    options
  ).then((res) => res.json());

  return res;

}

export async function handleChecked(data) {

  const options = {
    method: "POST",
    body: JSON.stringify({ 'cid_user': data.cid_user }),
  };

  let res = await fetch(
    domain + "/notice/updatestatus?id=" + data.id,
    options
  ).then((res) => res.json());

  return res;

}