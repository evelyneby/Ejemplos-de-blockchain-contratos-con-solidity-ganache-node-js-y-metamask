// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CrowdfundingProject {
    //Aqui creamos nuestras variables
    bool isFundable;
    uint256 goal;
    uint256 totalFunded;
    address owner;
    uint256 requiredFunds;
    string nameproject;
    string idproject;
    uint cant;


    //Inicializamos los valores, hay que recordar que el constructor se ejecuta solo una vez cuando se crea el contrato
    constructor() {
        goal = 0;
        owner = msg.sender;
        totalFunded = 0;
        isFundable = true;
    }

    function setNameId(string memory _nameproject, string memory _idproject) public{
        nameproject = _nameproject;
        idproject = _idproject;
    }

    function viewNameId() public view returns (string memory _dato) {
        _dato= string.concat(nameproject, idproject);
        return _dato;
    }

    //No te preocupes por esto,luego lo aprenderemos. El modifier permite cambiar el
    //comportamiento de funciones, en este caso solo queria asegurarme que solo el creador del contrato
    //pudiera mover el goal
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "debes de ser el propetiario del contrato para cambiar el objetivo"
        );
        _;
    }

    //Aqui ponemos la meta a recaudar, solamente el que inicializa el contrato puede cambiar este
    //valor
    function setGoal(uint256 _goal) public onlyOwner {
        goal = _goal;
    }

    function viewGoal() public view returns (uint256) {
        return goal;
    }

    function changeProjectState(bool change) public onlyOwner {
        isFundable = change;
    }

    //Aqui inicia la funcion para fondear el proyecto
    function fundproject(uint amountSender) public payable {
        //Primero evaluamos si el owner del contrato mantiene abiertas las donaciones (tal vez
        //necesita reevaluar algo)
        require(
            isFundable,
            "el propietario cerro la recauciacion por un tiempo mantengase al tanto"
        );
        //Comprobamos que el total que se ha fondeado sea menor a la meta
        require(
            totalFunded < goal,
            "el objetivo ya se logro, ya no puede financiar esto"
        );
        //Despues nos aeguramos que la persona mande un minimo,en este caso arriba de 0
        //require(msg.value != uint(0), "Please add some funds to contribuite to crowdfunding project");
        //Comprobamos que el valor que quiere fondear no exceda con la meta que tenemos
        require(
            totalFunded + msg.value <= goal,
            "no se puede agregar mas fondos, checa el monto restante del objetivo"
        );
        //Actualizamos el total que se ha fondeado al contrato
        totalFunded += amountSender;
        cant=cant+1;
    }

    //Esta funcion nos sirve para que la persona pueda ver cuanto se necesita para alcanzar la meta,
    //asi no tendra que estar adivinando cuanto depositar maximo
    function viewRemaining() public view returns (uint256) {
        uint256 remainingFunds = goal - totalFunded;

        return remainingFunds;
    }

    function viewDon() public view returns (uint256){
        return totalFunded;
    }

    function viewCant() public view returns (uint){
        return cant;
    }
}
