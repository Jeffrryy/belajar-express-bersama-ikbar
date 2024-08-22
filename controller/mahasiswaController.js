import db from "../koneksi.js"

const getMahasiswa = async (req,res) => {
    //mencari semua tabel mahasiswa
    const sql = "SELECT * FROM mahasiswa"
    //mengirim query ke database mysql
    db.query(sql,(error,result) => {
        //mengirim data ke client browser
        res.json(result)
    })
}

const getMahasiswaByNim = async (req, res) => {
    //mencari table tertentu
    //menangkap data query url
    const nim = req.query.nim
    //menangkap semua data dari table mahasiswa berdasarkan nim
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql,(error, result) => {
        if(error)
            {
                res.status(400)
                res.send(error)
            }
            res.status(200)
            //mengirim data hasil ke client browser
        res.json(result)
})
}

const createMahasiswa = async (req,res) => {
    //menambahkan data ke table
    //menangkap body dari response yang dikirim oleh thunderclient
    const {nim,nama_lengkap,kelas,alamat} = req.body
    //insert ke mahasiswa dengan nilai,nim,nama_lengkap,alamat dari body
    const sql = "INSERT INTO mahasiswa (nim,nama_lengkap,kelas,alamat) VALUES (?,?,?,?)"
    // const sql = "INSERT INTO mahasiswa SET ?"

    db.query(sql,[nim,nama_lengkap,kelas,alamat],(err,result,field) => {
        //jika terdapat error
        if(err) 
            {
                return res.status(500).json({message:"gagal insert data", error:err})
            }
            //jika tidak ada error
        res.status(201).json({message:"berhasil insert data", result:result})
    })
}

const deleteMahasiswa = async(req,res) => {
    const nim = req.query.nim
    const sql = `DELETE FROM mahasiswa WHERE nim = ? `

    db.query(sql,[nim],(error,result) => {
        if(error)
            {
                res.status(400)
                res.send(error)
            }
            res.status(201)
        res.json("data berhasil dihapus")
    })
}

const updateMahasiswa = async(req,res) => {
    const nim = req.query.nim

    const {nama_lengkap, kelas, alamat} = req.body
    if(nim || nama_lengkap || kelas || alamat){
        const sql = `UPDATE mahasiswa SET nama_lengkap = "${nama_lengkap}", kelas = "${kelas}, alamat = ${alamat}" WHERE nim = ${nim};`
        db.query(sql,(error,result) => {
            if (error)
                res.status(400).send(error.message)

            res.json(result)
        }) 
    }else{
        res.send("isi body")
    }
}
export {getMahasiswa,getMahasiswaByNim,createMahasiswa,deleteMahasiswa,updateMahasiswa}
