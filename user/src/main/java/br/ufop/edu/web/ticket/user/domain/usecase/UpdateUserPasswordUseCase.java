package br.ufop.edu.web.ticket.user.domain.usecase;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
public class UpdateUserPasswordUseCase {

    private String emailModel;
     private String emailPassed;
    private String oldPasswordModel;
    private String oldPasswordPassed;

    public void validate (){
        validateEmail();
        validateOldPassword();
    }

    private void validateEmail() {
        if (emailModel != emailPassed){
            throw new RuntimeException("Os emails não conferem");
        }

}
    private void validateOldPassword() {
        if (oldPasswordModel != oldPasswordPassed){
            throw new RuntimeException("As senhas não conferem");
        }
    }

}