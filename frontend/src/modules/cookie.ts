const cookies: any = document.cookie
  .split(";")
  .map((item) => item.split("="))
  .reduce(
    (acc: any, [k, v]) => (acc[k.trim().replace('"', "")] = v) && acc,
    {}
  );

export default cookies
