import { createHash } from "crypto";

const hash = (s: string): string => {
  return createHash("md5").update(s).digest("hex");
};

export default hash;
