
/**
 * m: mock
 */
export default (mock)=>{
  return {
    get: {
      getDetail: mock.GET + '/getDetail'
    },
  }
}