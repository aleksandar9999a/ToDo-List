export class Helper {
  executeAfterTime(fn: Function, time = 1000): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fn()
          .then((result: any) => {
            resolve(result);
          })
          .catch((error: Error) => {
            reject(error)
          })
      }, time)
    })
  }
}

export default new Helper();