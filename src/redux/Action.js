export const VALIDATE = 'VALIDATE';
export const container_id = 'container_id';
// defining the action creater
export const validate = () => {
  return {
    type: VALIDATE
  }
}
export const containerSearch = (value) =>{
  return{
    type:container_id,
    payload:value
  }
}