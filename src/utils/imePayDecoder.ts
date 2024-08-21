// utils/imePayDecoder.ts

export function decodeIMEPayResponse(data: string) {
    const decodedString = atob(decodeURIComponent(data));
    const [
      ResponseCode,
      ResponseDescription,
      Msisdn,
      TransactionId,
      RefId,
      TranAmount,
      TokenId
    ] = decodedString.split('|');
  
    return {
      ResponseCode,
      ResponseDescription,
      Msisdn,
      TransactionId,
      RefId,
      TranAmount,
      TokenId
    };
  }