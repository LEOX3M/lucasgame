class Level3 extends BaseLevel {
    constructor() {
        super('Level3');
    }

    create(data) {
        super.create(data);
        this.add.text(20, 20, 'Nivel 3', { fontSize: '24px', fill: '#fff' });
        // Configurar plataformas, enemigos, etc. específicos del nivel 3
    }
}