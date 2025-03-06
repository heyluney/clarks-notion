class IdGenerator {
    private static id : number = 0;

    static getNewId() : number {
        IdGenerator.id++;
        return IdGenerator.id;
    }
}

export default IdGenerator;