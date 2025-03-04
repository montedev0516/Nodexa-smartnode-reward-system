'use client'

import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PATCH, PUT, DELETE, OPTIONS",
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"

export const api = axios.create({ baseURL: "http://88.99.90.19:5001/api" });
