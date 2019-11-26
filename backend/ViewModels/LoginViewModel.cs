using System.ComponentModel.DataAnnotations;

namespace backend.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Informe o e-mail")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Informe a senha")]
        [StringLength(30, MinimumLength = 3, ErrorMessage = "A senha deve conter no mínimo 3 caracteres")]
        public string Senha { get; set; }
    }
}