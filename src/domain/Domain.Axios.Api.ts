import { defer, Observable } from "rxjs"
import { map, catchError } from "rxjs/operators"

import initializeAxios from "./Domain.Axios.Setup"
import { axiosRequestConfiguration } from "./Domain.Axios.Config"
import { DomainResponse, createOkResponse } from "./Domain.Model"
import { mapDomainError } from "./Domain.Mapper"

const axiosInstance = initializeAxios(axiosRequestConfiguration)

const get = <T>(url: string, queryParams?: object): Observable<DomainResponse<T>> => {
  return defer(() => axiosInstance.get<T>(url, { params: queryParams })).pipe(
    map((result) => createOkResponse(result.data)),
    catchError((e) => mapDomainError<T>(e)),
  )
}

const post = <T>(
  url: string,
  body: object,
  queryParams?: object,
): Observable<DomainResponse<T> | void> => {
  return defer(() => axiosInstance.post<T>(url, body, { params: queryParams })).pipe(
    map((result) => createOkResponse(result.data)),
    catchError((e) => mapDomainError<T>(e)),
  )
}

const put = <T>(
  url: string,
  body: object,
  queryParams?: object,
): Observable<DomainResponse<T> | void> => {
  return defer(() => axiosInstance.put<T>(url, body, { params: queryParams })).pipe(
    map((result) => createOkResponse(result.data)),
    catchError((e) => mapDomainError<T>(e)),
  )
}

const patch = <T>(
  url: string,
  body: object,
  queryParams?: object,
): Observable<DomainResponse<T> | void> => {
  return defer(() => axiosInstance.patch<T>(url, body, { params: queryParams })).pipe(
    map((result) => createOkResponse(result.data)),
    catchError((e) => mapDomainError<T>(e)),
  )
}

const deleteR = <T>(url: string, id: number): Observable<DomainResponse<T> | void> => {
  return defer(() => axiosInstance.delete(`${url}/${id}`)).pipe(
    map((result) => createOkResponse(result.data)),
    catchError((e) => mapDomainError<T>(e)),
  )
}

export default { get, post, put, patch, delete: deleteR }
