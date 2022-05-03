describe("React TodoMVC practice", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8888/")
  })

  it("adds five todos", () => {
    // Without using the cy.createDefaultTodos() custom command
    // write a test that asserts you can add 5 todos
    // Hint: make sure to assert the length is equal to 5
    cy.get(".new-todo")
      .type("Milk{enter}")
      .type("Eggs{enter}")
      .type("Bread{enter}")
      .type("Coffee{enter}")
      .type("Tea{enter}")
    cy.get(".todo-list li").should("have.length", 5)
  })

  it("focuses on the todo input field, when the app is first opened", () => {
    // Write a test that asserts that the input field
    // is focused automatically when the app is first loaded.
    // Hint: you will need to use cy.focused()
    // https://docs.cypress.io/api/commands/focused
    cy.focused().should("have.class", "new-todo")
  })

  it("should clear text input field when an item is added", () => {
    // Write a test that ensures that the input field is cleared
    // after adding a todo
    cy.get(".new-todo").type("Milk{enter}")
    cy.get(".new-todo").should("be.empty")
  })

  it('can mark a todo as "completed"', () => {
    // Write a test that ensures that a todo can be "completed"
    // Hint: You will need to verify the class name of the completed todo
    cy.get(".new-todo").type("Milk{enter}")
    cy.get(".toggle").click()
    cy.get(".todo-list li").eq(0).should("have.class", "completed")
  })

  it('the "Clear completed" button clears all completed todos', () => {
    // Write a test that ensures that the "Clear completed" removes
    // all completed todos from the app
    // Hint: You will need to verify the class name of the completed todo
    cy.get(".new-todo").type("Milk{enter}")
    cy.get(".toggle").click()
    cy.get(".clear-completed").click()
    cy.get(".todo-list").should("not.exist")
  })

  it("allows you to edit a todo", () => {
    // Write a test that ensures that you can edit a todo
    // Hint: You will need to use cy.dblclick()
    // https://docs.cypress.io/api/commands/dblclick
    cy.get(".new-todo").type("Milk{enter}")
    cy.get(".todo-list li").eq(0).should("have.text", "Milk")
    cy.get(".todo-list li")
      .eq(0)
      .dblclick()
      .type("{backspace}{backspace}{backspace}{backspace}Eggs{enter}")
    cy.get(".todo-list li").eq(0).should("have.text", "Eggs")
  })

  it("should save edits on blur", () => {
    // Write a test that ensures that an edited todo is saved when it is blurred
    // Hint: You will need to use cy.blur()
    // https://docs.cypress.io/api/commands/blur
    cy.get(".new-todo").type("Milk{enter}")
    cy.get(".todo-list li").eq(0).should("have.text", "Milk")
    cy.get(".todo-list li")
      .eq(0)
      .dblclick()
      .type("{backspace}{backspace}{backspace}{backspace}Eggs")
    cy.get(".edit").blur()
    cy.get(".todo-list li").eq(0).should("have.text", "Eggs")
  })

  it("should display the current number of todo items", () => {
    // Write a test that ensures that the app counts the correct number of todos
    // left to be completed, i.e "3 items left" in the bottom left corner.
    cy.get(".new-todo")
      .type("Milk{enter}")
      .type("Eggs{enter}")
      .type("Bread{enter}")
      .type("Coffee{enter}")
      .type("Tea{enter}")
    cy.get(".todo-count").should("have.text", "5 items left")
    cy.get(".toggle").eq(0).click()
    cy.get(".toggle").eq(1).click()
    cy.get(".todo-count").should("have.text", "3 items left")
  })

  it("should persist its data after a page refresh", () => {
    // Write a test that ensures that the todos are persisted in the app
    // after the browser refreshes the page
    // Hint: You will need to use cy.reload()
    // https://docs.cypress.io/api/commands/reload
    cy.get(".new-todo")
      .type("Milk{enter}")
      .type("Eggs{enter}")
      .type("Bread{enter}")
      .type("Coffee{enter}")
      .type("Tea{enter}")
    cy.get(".todo-list li").should("have.length", 5)
    cy.reload()
    cy.get(".todo-list li").should("have.length", 5)
  })

  it.only("can display only completed todos", () => {
    // Write a test that ensures that only the completed todos are
    // displayed when the "Completed" button is clicked at the bottom
    cy.get(".new-todo")
      .type("Milk{enter}")
      .type("Eggs{enter}")
      .type("Bread{enter}")
      .type("Coffee{enter}")
      .type("Tea{enter}")
    cy.get(".toggle").eq(0).click()
    cy.get(".toggle").eq(1).click()
    cy.get(`[data-reactid=".0.2.1.4"] > a`).click()
    cy.get(".todo-list li").should("have.length", 2)
  })
})
