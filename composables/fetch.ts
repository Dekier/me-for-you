// import { UseFetchOptions } from "#app";
// import { NitroFetchRequest } from "nitropack";
// import { KeyOfRes } from "nuxt/dist/app/composables/asyncData";

// export const mainFetch = <T>(
//   request: NitroFetchRequest,
//   opts?:
//     | UseFetchOptions<
//         T extends void ? unknown : T,
//         (res: T extends void ? unknown : T) => T extends void ? unknown : T,
//         KeyOfRes<
//           (res: T extends void ? unknown : T) => T extends void ? unknown : T
//         >
//       >
//     | undefined
// ) => {
//   const headers = {
//     "Content-Type": "application/json",
//   };
//   const config = useRuntimeConfig();

//   return useFetch<T>(request, {
//     baseURL: config.public.baseURL,
//     headers,
//     credentials: "omit",
//     responseType: "json",
//     ...opts,
//   });
// };
