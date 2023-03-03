import React from 'react'
import { useAxios } from '../../hooks/useAxios'

const ListadoVidrio = () => {

  const { data, error, loading, execute } = useAxios({
    url:'/asd',
    method:'GET',
    params: {algo: 'algo', page: 0, offset: 10, key_word: '', active: true}
  })

  return (
    <div>ListadoVidrio</div>
  )
}

export default ListadoVidrio