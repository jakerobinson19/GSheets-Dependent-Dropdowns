# Google-Sheets: Dependent Dropdowns
Script for applying dependent dropdowns in google sheets (current script has functions for two dependent dropdowns but can easily be updated to include more by copying ApplyXLevelValidation functions and updating a few lines)

Utilizes a main sheet where the dropdown will appear and a second sheet which contains the data to populate the dropdowns.

Options sheet should appear as below

Column1	       Column2		     Column3
Pasta           Long		      Spaghetti
Pasta           Long 		      Fettucine
Pasta	          Short		      Penne
Pasta	          Short		      Rigotini
Pasta   	      Short		      Macaroni
Pasta         	Short		      Ziti
Pasta         	Stuffed		    Ravioli
Pasta		        Other         Fahget About it
Pokemon         Electric		  Pikachu
Pokemon        	Electric		  Raichu
Pokemon         Legendary		  Mew
Pokemon         Legendary		  Mew-Two
Pokemon        	Legendary		  Ho-oh
Pokemon         Legendary		  Lugia
Pokemon         Pyschic       Psyduck
Pokemon         Pyschic		    Golduck
Party           Birthday	    Quinciera
Party	          Birthday	    Sweet Sixteen
Party	          Holiday		    Fourth of July
Party	          Holiday		    Halloween
Party	          Holiday		    New Years Eve

The script will map the options data to populate the dropdown with a list of option based on the preceeding information in the columns before, i.e., if you're getting options from Column3 the script will look at Column1 and Column2 and if it is Pasta, Long will retrieve Spaghetti and Fettucine to show up in the dropdown.
