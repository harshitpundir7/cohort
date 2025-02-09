import { useEffect, useState } from "react";

export function usePost(){
    const [post, setPost] = useState({})

    async function getData(){
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
        const json = await response.json();
        setPost(json)
    }
    useEffect(()=>{
        getData();
    },[])
    return post;
}

export function useFetch(url){
    const [data, setData] = useState({})
    async function getData(){
        const response = await fetch(url)
        const value = await response.json()
        setData(value)
    }
    useEffect(()=>{
        getData();
    },[url])
    return data;
}