import Message from '../models/message.js'

let controller={
    //function to save message
    save:(req,res)=>{
        let params=req.body
        let message=new Message()
        message.message=params.message
        message.from=params.from

        message.save((error,messageStored)=>{
            if(error || !messageStored){
                return res.status(404).send({
                    status:'error',
                    message:'Cannot save the message'
                })
            }

            return res.status(200).send({
                status:'Success',
                messageStored
            })
        })
    },
    //Function to get all message
    getMessages:(req,res)=>{
        let query=Message.find({})
            query.sort('-_id').exec((error,messages)=>{
                if(error){
                    return res.status(500).send({
                        status:'Error',
                        message:"Error trying get data"
                    })
                }
                if(!messages){
                    return res.status(400).send({
                        status:'Error',
                        message:"there is no messages to show"
                    })
                }

                return res.status(200).send({
                    status:'Success',
                    messages
                })

            })
       
    }
}

export default controller