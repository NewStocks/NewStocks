// 로컬 스토리지에서 access_token 가져오기
export function getAccessToken() {
    return localStorage.getItem('access-token');
}
  
// access_token을 헤더에 추가하는 함수
export function addAccessTokenToHeaders(headers = {}) {
    const accessToken = getAccessToken();
    if (accessToken) {
        return {
        ...headers,
        "access-token": accessToken,
        };
    }
    return headers;
}
  