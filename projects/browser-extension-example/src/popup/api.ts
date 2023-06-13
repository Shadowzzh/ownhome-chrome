import { BASE_URL, ajax } from '../../api'

export interface LoginParams {
    account: string
    password: string
    address: string

}

export interface LoginResponse {
    accessToken: string
    appKey: string
    refreshToken: string
    userCode: string
}

export const login = async (params: LoginParams) => {
    try {
        const res = await ajax<LoginResponse>(`${BASE_URL}/login`, 'POST', {
            ...params,
            appKey: 'WEB'
        })
        return res.data
    } catch (error) {
        return undefined
    }
}
