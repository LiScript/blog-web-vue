import Vue from 'vue'
const signalR = require('@aspnet/signalr')
const vm = new Vue()
export const connection = new signalR.HubConnectionBuilder().withUrl(vm.host + '/DeviceHub').build()
