import express from "express";
import sql from "mssql";
import { sqlConfig } from "../sql/config.js";

const router = express.Router();

// Rotas de Veiculos

router.get("/veiculos", (req, res) => {
    try {
        sql.connect(sqlConfig)
            .then((pool) => {
                return pool.request().execute("SP_S_LOC_VEICULO");
            })
            .then((dados) => {
                res.status(200).json(dados.recordset);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    } catch (err) {
        console.error(`Erro de conexão: ${err.message}`);
    }
});

router.post("/veiculos", (req, res) => {
    sql.connect(sqlConfig)
        .then((pool) => {
            const { placa, nome, descricao, fabricacao } = req.body;
            return pool
                .request()
                .input("Placa", sql.Char(7), placa)
                .input("Nome", sql.VarChar(50), nome)
                .input("Descricao", sql.VarChar(200), descricao)
                .input("Fabricacao", sql.Date, fabricacao)
                .output("codigogerado", sql.Int)
                .execute("SP_I_LOC_VEICULO");
        })
        .then((dados) => {
            res.status(200).json(dados.output);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

router.put("/veiculos", (req, res) => {
    sql.connect(sqlConfig)
        .then((pool) => {
            const { codigo, placa, nome, descricao, fabricacao } = req.body;
            return pool
                .request()
                .input("Codigo", sql.Int, codigo)
                .input("Placa", sql.Char(7), placa)
                .input("Nome", sql.VarChar(50), nome)
                .input("Descricao", sql.VarChar(200), descricao)
                .input("Fabricacao", sql.Date, fabricacao)
                .execute("SP_U_LOC_VEICULO");
        })
        .then((dados) => {
            res.status(200).json(`Veículo alterado com sucesso`);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

router.delete("/veiculos", (req, res) => {
    sql.connect(sqlConfig)
        .then((pool) => {
            const { placa } = req.body;
            return pool
                .request()
                .input("Placa", sql.Char(7), placa)
                .execute("SP_D_LOC_VEICULO");
        })
        .then((dados) => {
            res.status(200).json(`Deletado com sucesso`);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

//Rotas de Clientes

router.get("/clientes", (req, res) => {
    try {
        sql.connect(sqlConfig)
            .then((pool) => {
                return pool.request().execute("SP_S_LOC_CLIENTE");
            })
            .then((dados) => {
                res.status(200).json(dados.recordset);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    } catch (err) {
        console.error(`Erro de conexão: ${err.message}`);
    }
});

router.post("/clientes", (req, res) => {
    sql.connect(sqlConfig)
        .then((pool) => {
            const { cpf, nome, codigoVeiculo, locacao, devolucao } = req.body;
            return pool
                .request()
                .input("cpf", sql.Char(14), cpf)
                .input("Nome", sql.VarChar(100), nome)
                .input("CODIGOVEICULO", sql.Int, codigoVeiculo)
                .input("Locacao", sql.Date, locacao)
                .input("Devolucao", sql.Date, devolucao)
                .output("codigogerado", sql.Int)
                .execute("SP_I_LOC_CLIENTE");
        })
        .then((dados) => {
            res.status(200).json(dados.output);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

router.put("/clientes", (req, res) => {
    sql.connect(sqlConfig)
        .then((pool) => {
            const { cpf, nome, codigoVeiculo, locacao, devolucao } = req.body;
            return pool
                .request()
                .input("cpf", sql.Char(14), cpf)
                .input("Nome", sql.VarChar(100), nome)
                .input("CODIGOVEICULO", sql.Int, codigoVeiculo)
                .input("Locacao", sql.Date, locacao)
                .input("Devolucao", sql.Date, devolucao)
                .execute("SP_U_LOC_CLIENTE");
        })
        .then((dados) => {
            res.status(200).json(`Cliente alterado com sucesso`);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

router.delete("/clientes", (req, res) => {
    sql.connect(sqlConfig)
        .then((pool) => {
            const { cpf } = req.body;
            return pool
                .request()
                .input("Cpf", sql.Char(14), cpf)
                .execute("SP_D_LOC_Cliente");
        })
        .then((dados) => {
            res.status(200).json(`Deletado com sucesso`);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
});

export default router;
