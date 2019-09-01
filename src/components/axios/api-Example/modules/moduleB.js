
/**
 * m: mock
 */
export default (mock)=>{
  return {
    get: {
      getTest: mock.GET + '/getTest',
    },
    postJSON: {
      postTest: mock.POST + '/getList'
    }
  }
};