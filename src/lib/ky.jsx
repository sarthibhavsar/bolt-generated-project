import kyStandard from "ky";

const addAuthHeaderToRequest = (request) => {
  request.headers.set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiSmF5ZXNoIiwidXNlcklkIjoiSmF5ZXNoIiwibmJmIjoxNzMzMzEyNzcyLCJleHAiOjE3MzMzNDE1NzIsImlhdCI6MTczMzMxMjc3Mn0.5ky3I0K7DMeHEnZkNS2hjmm21xgVENQak6z07DyLq2E`);
  request.headers.set("Signature", "fe0be65ba2288d66f6564556c857e50e");
};

export default kyStandard.create({
  hooks: {
    beforeRequest: [addAuthHeaderToRequest],
  },
});
