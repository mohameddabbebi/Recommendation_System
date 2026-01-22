package com.example.demo.entity;

public enum InteractionType {
	// VIEW, CLICK, PURCHASE, ADD_TO_CART
	VIEW("view"),CLICK("click"),PURCHASE("purchase"),ADD_TO_CART("add_to_cart");
	InteractionType(String string) {
		this.name=string;
	}
	public String from_InteractionTypeToString() {
		return this.name;
	}
	public static InteractionType From_String_To_(String p) {
		for(InteractionType type : InteractionType.values()) {
			if(type.name.equals(p)) {
				return type;
			}
		}
		throw new IllegalArgumentException("c'est pas une bonne chaine de caractere :=)");
	}
	public String name;
	
}
