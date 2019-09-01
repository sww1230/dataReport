// 面包屑数据
const crumbs = {
  title: 'crumbs',
  icon: true,
  content: (callback)=>{
    window.$ajax.get('/GET/getTest').then(function (response) {
      callback(response.data)
    }).catch(function (error) {
      console.log(error,555666);
    });
    return [
    'afafad11',
    'ccccc',
    'eeeeeefffff'
  ]}
}

export default crumbs;