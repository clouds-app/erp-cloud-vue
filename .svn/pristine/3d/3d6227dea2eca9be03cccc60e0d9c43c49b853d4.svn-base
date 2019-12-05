import request from "@/libs/request"
export const getOptionSourceItem = (query,path="pValue",requestBaseUrl="/common/sys/dic/childList") => {
    debugger
    if(!!query){
      let url = `${requestBaseUrl}/${query}?qt=${path}`;
      request.get(url).then(res => {
          return res
      });
    } 
  }