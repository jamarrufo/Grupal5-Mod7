import ExpeDiagnostico from '../models/ExpeDiagnostico.js';



export const getExpeDiagnosticos = async(req,res) =>{
    const ExpDiagnosticos = await ExpeDiagnostico.findAll();
    res.json({proyectos: ExpDiagnosticos})
}

export const getExpeDiagnostico = async (req,res) =>{
    const {folio} = req.params
    const ExpDiagnosticos = await ExpeDiagnostico.findByPk(folio);
    if(ExpDiagnosticos){
        res.json(ExpDiagnosticos)
    }else{
        res.status(404).json({
            msg:`No existe el expediente con el folio num ${folio}`
        })
    }
}

export const postExpeDiagnostico = async (req,res) => {

   const { body } = req;

   try {
        const existeFolio = await ExpeDiagnostico.findOne({
                where:{
                    folio:body.folio    
                }
        })

        if(existeFolio){
                return res.status(400).json({
                    msg:`Ya existe el num folio del expediente diagnostico ${body.folio }`
                })
        }

        const expe_diagnostico = new ExpeDiagnostico(body)
        await expe_diagnostico.save();
        res.json(expe_diagnostico)

   } catch (error) {
        res.status(500).json({
            msg:`${error}`
        })
   }
  

}

export const putExpeDiagnostico = async (req,res) => {

    const { folio } = req.params
    const { body } = req;

    try {
        const existeFolio = await ExpeDiagnostico.findByPk(folio); 
        if(!existeFolio){
            return res.status(404).json({
                msg:`No existe el expediente con el num folio ${folio}`
            })
        }
        await existeFolio.update(body);
        res.json(existeFolio)

    } catch (error) {
        res.status(500).json({
            msg:'Se ha producido un error, comuniquese con el administrador'
        })
    }
}

export const deleteExpeDiagnostico = async (req,res) =>{
    const { folio } = req.params
    
    const existeFolio = await ExpeDiagnostico.findByPk(folio);

    if(!existeFolio){
        return res.status(404).json({
            msg:`No existe el expediente con el nume folio ${folio}`
        })
    }
    await existeFolio.destroy();
    res.json(existeFolio)
}