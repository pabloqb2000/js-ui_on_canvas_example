/**
 * Generic element to be inside the UI
 */
class UiElement{
    /**
     * Constructor of the generic UI Element
     * 
     * @param x X position of the element 
     * @param y Y position of the element
     * @param width Width of the element
     * @param height Height of the element
     * @param draggable True if the element should be updated on mouseDragged
     * @param clickable True if the element should be updated on mouseClicked
     * @param visible Default visibility
     */
    constructor(x, y, width, height, draggable, clickable, visible=true){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.draggable = draggable;
        this.clickable = clickable;

        this.highlighted = false;
        this.visible = visible;
        this.forceDraw = false;

        UI.addElement(this);
    }

    /**
     * @return The width of the element
     */
    getWidth() {
        return this.width;
    }

    /**
     * @return The height of the element
     */
    getHeight() {
        return this.height;
    }

    /**
     * Draws empty element
     */
    draw() {

    }

    /**
     * Checks if mouse is inside the slider
     * if so highlights the slider
     */
    update() {
        this.highlighted = this.mouseIsOver();    
    }

    /**
     * @return true if the mouse is over the element
     */
    mouseIsOver(){
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }
}