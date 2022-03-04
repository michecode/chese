import axios from 'axios';

const pinataKey = process.env.GATSBY_PINATA_KEY;
const pinataSecret = process.env.GATSBY_PINATA_SECRET;

export const pinJSONToIPFS = async (JSONBody: any) => {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

  if (!pinataKey || !pinataSecret) {
    return {
      success: false,
      message: 'No pinata api / secret found.',
      pinataUrl: '',
    };
  }
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: pinataKey,
        pinata_secret_api_key: pinataSecret,
      },
    })
    .then((response) => {
      return {
        success: true,
        message: '',
        pinataUrl:
          'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        pinataUrl: '',
        message: error.message,
      };
    });
};
