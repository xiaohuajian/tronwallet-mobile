import { AsyncStorage } from 'react-native'


class NodeIp {
    constructor() {
        this.nodeIp = "35.231.121.122:50051"
        this.nodeSolidityIp = "35.231.121.122:50052"
    }

    getStorageNodes = async () => {
        const nodes = await Promise.all([
            AsyncStorage.getItem("NODE_IP"),
            AsyncStorage.getItem("NODE_SOLIDITY_IP")
        ])
        if (nodes.length) return { nodeIp: nodes[0], nodeSolidityIp: nodes[1] }
        else return null;
    }

    async initNodes() {
        try {
            const nodes = await this.getStorageNodes();
            if (nodes) return
            const setNode = () => AsyncStorage.setItem('NODE_IP', this.nodeIp)
            const setSolidityNode = () => AsyncStorage.setItem('NODE_SOLIDITY_IP', this.nodeSolidityIp)
            await Promise.all([setNode(), setSolidityNode()])
        } catch (error) {
            console.warn(error)
            throw new Error(error)
        }
    }

    async setNodeIp(type, nodeip) {
        //Types
        // 'main' or 'solidity'
        try {
            const item = type === 'solidity' ? 'NODE_SOLIDITY_IP' : 'NODE_IP'
            await AsyncStorage.setItem(item, nodeip)
            alert('Node IP updated!')
        } catch (error) {
            console.warn(error)
            throw new Error(error)
        }
    }
    async setAllNodesIp(mainnode, soliditynode) {
        try {
            const setNode = () => AsyncStorage.setItem('NODE_IP', mainnode)
            const setSolidityNode = () => AsyncStorage.setItem('NODE_SOLIDITY_IP', soliditynode)
            await Promise.all([setNode(), setSolidityNode()])
            alert('Nodes IPs updated')
        } catch (error) {
            console.warn(error)
            throw new Error(error)
        }
    }
    
    async getAllNodesIp() {
        try {
            const nodes = this.getStorageNodes()
            if (nodes) return nodes
            else throw new Error('No node found!')
        } catch (error) {
            throw new Error(error)
        }
    }

    async resetNodesIp(type) {
        //Types
        // 'main' or 'solidity'
        try {
            const item = type === 'solidity' ? 'NODE_SOLIDITY_IP' : 'NODE_IP'
            const newIp = type === 'solidity' ? this.nodeSolidityIp : this.nodeIp
            await AsyncStorage.setItem(item, newIp)
        } catch (error) {
            console.warn(error)
            throw new Error(error)
        }
    }
}

export default new NodeIp();