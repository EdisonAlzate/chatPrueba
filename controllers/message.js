import Message from '../models/message.js'

let controller = {
    //function to save message
    save: async (req, res) => {
        let params = req.body
        let message = new Message()
        message.message = params.message
        message.from = params.from

        const result = await message.save()
        try {
            if (result) {
                return res.status(200).send({
                    status: 'Success',
                    message: "The message saved"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(404).send({
                status: 'error',
                message: 'Cannot save the message'
            })
        }
    },

    //Function to get all message
    getMessages: async (req, res) => {
        let query = await Message.find({})
        try {
            if (query) {
                return res.status(200).send({
                    status: 'Success',
                    query
                })
            }
        } catch (error) {
            if (error) {
                return res.status(500).send({
                    status: 'Error',
                    message: "Error trying get data"
                })
            }
        }
    }
}

export default controller