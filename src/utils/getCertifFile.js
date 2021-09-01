import {
    createSolidDataset,
    getSolidDataset,
    getThingAll,
    saveSolidDatasetAt,
  } from "@inrupt/solid-client";
  
export async function GetCertifFile(Url, session) {
  try {
    //finds the given dataset if available
    const certifFile = await getSolidDataset(Url, { fetch: session.fetch })

    return certifFile;
    //return certifFolder;

  } catch (error) {
    console.log("getCertifFile error", error)
  }
}