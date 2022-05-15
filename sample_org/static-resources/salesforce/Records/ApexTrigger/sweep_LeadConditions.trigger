trigger sweep_LeadConditions on Lead (after insert, after update) {
  				for (Lead obj: Trigger.new) {
  					if (obj.Status == 'New') {
  					if (obj.firstname != 'null' && obj.lastname != 'null' && ( !obj.email.containsIgnoreCase('@gmail') || !obj.email.containsIgnoreCase('@hotmail') || !obj.email.containsIgnoreCase('@walla'))) {
  				obj.Status = 'MQL';
  			}if (obj.firstname == 'null' && obj.lastname == 'null' && obj.email.containsIgnoreCase('@gmail')) {
  				obj.Status = 'NON-MQL';
  			}
  				}if (obj.Status == 'MQL') {
  					if (obj.firstname != 'null' && obj.lastname != 'null' && !obj.email.containsIgnoreCase('@gmail')) {
  				obj.Status = 'SQL';
  			}if (obj.firstname == 'null' && obj.lastname == 'null' && obj.email.containsIgnoreCase('@gmail')) {
  				obj.Status = 'NON-SQL';
  			}
  				}if (obj.Status == 'NON-MQL') {
  					if (obj.firstname != 'null' && obj.lastname != 'null' && !obj.email.containsIgnoreCase('@gmail')) {
  				obj.Status = 'MQL';
  			}
  				}
  				}
  			}