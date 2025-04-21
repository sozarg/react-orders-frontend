@app.get("/orders/", response_model=List[dict])
async def get_all_orders():
    try:
        # Primero verificamos la conexión
        test_query = xata.data().query("orders", {"page": {"size": 1}})
        if not test_query.is_success():
            raise HTTPException(
                status_code=500,
                detail="Error de conexión con la base de datos"
            )

        # Si la conexión es exitosa, intentamos obtener todos los registros
        records = xata.records().get_all("orders")
        
        # Verificamos si records es None o está vacío
        if not records:
            return []  # Retornamos lista vacía si no hay registros
            
        return records

    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Error detallado: {str(e)}")  # Log del error para debugging
        raise HTTPException(
            status_code=500,
            detail=f"Error al obtener los pedidos: {str(e)}"
        )

@app.get('/favicon.ico')
async def get_favicon():
    return FileResponse('static/favicon.ico') 