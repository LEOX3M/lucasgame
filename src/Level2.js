class Level2 extends BaseLevel {
    constructor() {
        super('Level2');
    }

    create(data) {
        super.create(data);
        this.add.text(20, 20, 'Nivel 2', { fontSize: '24px', fill: '#fff' });
        // Configurar plataformas, enemigos, etc. específicos del nivel 2
    }
}