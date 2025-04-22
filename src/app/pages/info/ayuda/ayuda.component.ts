import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = 'Todos';
  
  categories = [
    { name: 'Todos', icon: 'dashboard' },
    { name: 'Boletos', icon: 'confirmation_number' },
    { name: 'Transporte', icon: 'directions_bus' },
    { name: 'Pago', icon: 'payment' },
    { name: 'Cuenta', icon: 'person' }
  ];
  
  faqs = [
    {
      question: '¿Cómo compro boletos para un evento?',
      answer: 'Para comprar boletos, navega hasta el evento deseado, selecciona la cantidad de boletos, elige la ubicación si es necesario y procede al pago. Puedes pagar con tarjeta de crédito/débito, PayPal o Yape.',
      category: 'Boletos'
    },
    {
      question: '¿Puedo transferir mis boletos a otra persona?',
      answer: 'Sí, puedes transferir tus boletos a otra persona desde tu cuenta. Ve a "Mis Boletos", selecciona el evento y haz clic en "Transferir". Necesitarás el correo electrónico de la persona a quien quieres transferir los boletos.',
      category: 'Boletos'
    },
    {
      question: '¿Cómo solicito un reembolso?',
      answer: 'Los reembolsos dependen de la política del evento. Para solicitar un reembolso, ve a "Mis Boletos", selecciona el evento y haz clic en "Solicitar Reembolso". Ten en cuenta que algunos eventos no permiten reembolsos o pueden tener un período de tiempo limitado para solicitarlos.',
      category: 'Boletos'
    },
    {
      question: '¿Cómo reservo un viaje de transporte?',
      answer: 'Para reservar transporte, navega a la sección "Transporte", selecciona tu origen y destino, fecha del viaje y número de pasajeros. Elige entre las opciones disponibles y procede al pago para confirmar tu reserva.',
      category: 'Transporte'
    },
    {
      question: '¿Puedo modificar mi reserva de transporte?',
      answer: 'Sí, puedes modificar tu reserva de transporte hasta 24 horas antes de la salida. Ve a "Mis Viajes" en tu perfil y selecciona la opción "Modificar Reserva". Ten en cuenta que pueden aplicarse cargos adicionales dependiendo de la nueva tarifa.',
      category: 'Transporte'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Actualmente aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal y Yape. Todos los pagos se procesan de forma segura a través de nuestra plataforma encriptada.',
      category: 'Pago'
    },
    {
      question: '¿Es seguro comprar en Boletería?',
      answer: 'Sí, todas nuestras transacciones están protegidas con encriptación SSL de 256 bits y cumplimos con los estándares PCI DSS para el procesamiento seguro de pagos. Nunca almacenamos información completa de tarjetas de crédito en nuestros servidores.',
      category: 'Pago'
    },
    {
      question: '¿Cómo recupero mi contraseña?',
      answer: 'Para recuperar tu contraseña, haz clic en "Iniciar Sesión" y luego en "¿Olvidaste tu contraseña?". Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.',
      category: 'Cuenta'
    },
    {
      question: '¿Cómo actualizo mi información personal?',
      answer: 'Para actualizar tu información personal, inicia sesión en tu cuenta, ve a "Mi Perfil" y haz clic en "Editar". Actualiza la información necesaria y guarda los cambios.',
      category: 'Cuenta'
    }
  ];
  
  filteredFaqs = [...this.faqs];

  constructor() { }

  ngOnInit(): void {
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  ngDoCheck(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredFaqs = this.faqs.filter(faq => {
      // Filtrar por categoría si no es "Todos"
      const matchCategory = this.selectedCategory === 'Todos' || faq.category === this.selectedCategory;
      
      // Filtrar por búsqueda si hay una consulta
      const matchQuery = !this.searchQuery || 
                         faq.question.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return matchCategory && matchQuery;
    });
  }
}
