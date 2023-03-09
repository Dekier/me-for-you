import { Client } from "@notionhq/client";
export default defineEventHandler(async (data) => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  if (data.node.req.method === "POST") {
    const { properties } = await readBody(data);
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID_ORDERS2,
      },
      properties,
    });
    data.node.res.statusCode = 200;
    data.node.res.end();
    return response;
  } else {
    const databaseProductType = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_PRODUKT_TYPE,
    });
    const databasePads = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_PAD,
    });

    const productTypeList = databaseProductType.results.map((data) => {
      return data.properties.name.title[0].plain_text;
    });

    const padData = databasePads.results.map((data) => {
      return data.properties;
    });
    return {
      padData,
      productTypeList,
      // zamówienia: database.results,
    };
  }
  //   const database = await notion.databases.query({
  //     database_id: process.env.NOTION_DATABASE_ID,
  //   });
});
